import Link from "next/link";

export default function Nosotros() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Sobre <span className="text-[var(--accent)]">nosotros</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
          Conoce la historia detrás de Más Imagen.
        </p>
      </div>

      {/* Historia */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Nuestra historia</h2>
          <div className="mt-6 space-y-4 text-[var(--muted-foreground)] leading-relaxed">
            <p>
              Más Imagen nació como un pequeño taller de serigrafía con la
              visión de ofrecer impresiones de calidad a precios accesibles.
              Desde nuestros inicios, nos ha movido la pasión por transformar
              ideas en productos tangibles.
            </p>
            <p>
              A lo largo de los años hemos perfeccionado nuestras técnicas,
              incorporando nuevas tecnologías como el grabado láser y la
              sublimación para ampliar nuestra oferta de servicios.
            </p>
            <p>
              Hoy, nuestro compromiso sigue siendo el mismo: atención
              personalizada, entrega puntual y un resultado que supere las
              expectativas de cada cliente.
            </p>
          </div>
        </div>

        {/* Valores / Stats */}
        <div className="space-y-8">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
            <h3 className="font-heading text-xl font-semibold">
              Lo que nos distingue
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
              {[
                "Experiencia comprobada en el ramo de la serigrafía",
                "Atención personalizada a cada cliente y proyecto",
                "Materiales de primera calidad para acabados duraderos",
                "Entrega puntual, cumpliendo los plazos acordados",
                "Precios competitivos sin sacrificar calidad",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contacto"
            className="block w-full rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
          >
            Trabaja con nosotros
          </Link>
        </div>
      </div>
    </div>
  );
}
