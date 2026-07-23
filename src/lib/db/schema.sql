-- ============================================
-- Serigrafics — Esquema de Base de Datos (Fase 2)
-- PostgreSQL + PostgREST
-- NO INTEGRAR hasta indicación explícita
-- ============================================

-- Tabla de clientes
CREATE TABLE clientes (
    id            SERIAL PRIMARY KEY,
    nombre        VARCHAR(200)  NOT NULL,
    email         VARCHAR(200),
    telefono      VARCHAR(20)   NOT NULL,
    empresa       VARCHAR(200),
    fecha_registro TIMESTAMPTZ  DEFAULT now(),
    notas         TEXT
);

-- Tabla de modelos/productos
CREATE TABLE modelos (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    descripcion TEXT,
    servicio    VARCHAR(50)  NOT NULL CHECK (servicio IN (
                    'serigrafia', 'tampografia', 'grabado-laser',
                    'sublimacion', 'lonas', 'otro'
                )),
    precio_base DECIMAL(10,2),
    activo      BOOLEAN DEFAULT true
);

-- Tabla de pedidos (envíos con guía)
CREATE TABLE pedidos (
    id              SERIAL PRIMARY KEY,
    cliente_id      INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    modelo_id       INTEGER REFERENCES modelos(id) ON DELETE SET NULL,
    fecha_pedido    TIMESTAMPTZ DEFAULT now(),
    fecha_envio     TIMESTAMPTZ,
    numero_guia     VARCHAR(100) UNIQUE NOT NULL,   -- El cliente busca con esto
    paqueteria      VARCHAR(50)  DEFAULT 'Por definir',
    estado          VARCHAR(30)  DEFAULT 'pendiente' CHECK (estado IN (
                        'pendiente', 'en_produccion', 'enviado',
                        'en_transito', 'entregado', 'cancelado'
                    )),
    costo_total     DECIMAL(10,2),
    costo_envio     DECIMAL(10,2) DEFAULT 0,
    notas           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Regla de negocio: envíos +$50 para pedidos de $2500+
-- Se maneja a nivel de aplicación/lógica de negocio

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pedidos_updated_at
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Índices para búsquedas comunes
CREATE INDEX idx_pedidos_numero_guia ON pedidos(numero_guia);
CREATE INDEX idx_pedidos_cliente_id  ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_estado      ON pedidos(estado);

-- Vista para consulta pública de rastreo
-- Solo expone lo que el cliente debe ver
CREATE VIEW rastreo_publico AS
SELECT
    p.numero_guia,
    p.estado,
    p.fecha_envio,
    p.paqueteria,
    c.nombre AS cliente_nombre
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id;
