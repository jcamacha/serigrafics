import Link from "next/link";

const PHASE2 = process.env.NEXT_PUBLIC_PHASE2 === "true";

const serviciosLinks = [
  { label: "Serigrafía en botellas", href: "/servicios#serigrafia" },
  { label: "Tampografía", href: "/servicios#tampografia" },
  { label: "Grabado láser", href: "/servicios#grabado-laser" },
  { label: "Sublimación", href: "/servicios#sublimacion" },
  { label: "Lonas", href: "/servicios#lonas" },
];

const empresaLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  ...(PHASE2 ? [{ label: "Rastreo", href: "/rastreo" }] : []),
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Link
              href="/"
              className="font-heading text-lg font-semibold tracking-tight text-white"
            >
              Más<span className="text-[var(--accent)]">Imagen</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 max-w-xs">
              Especialistas en impresión sobre botellas, termos y envases.
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Desde [AÑO]
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white">
              Servicios
            </h3>
            <ul className="mt-3 space-y-2">
              {serviciosLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white">
              Empresa
            </h3>
            <ul className="mt-3 space-y-2">
              {empresaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ubicación — MSP-inspired */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white">
              Visítanos
            </h3>
            <div className="mt-3 space-y-3 text-sm text-gray-400">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                  Taller
                </p>
                <p>[Dirección pendiente]</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                  Teléfono
                </p>
                <p>[Teléfono pendiente]</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                  Horario
                </p>
                <p>[Horario pendiente]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Más Imagen. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
