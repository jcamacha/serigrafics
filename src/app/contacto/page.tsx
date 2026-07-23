import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactoInfo from "@/components/ContactoInfo";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Contacto — Serigrafics",
  description:
    "Ponte en contacto con Serigrafics. Cotiza tu proyecto por WhatsApp o formulario.",
};

export default function Contacto() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Encabezado */}
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="text-[var(--accent)]">Contacto</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)]">
          Elige el canal que prefieras. Respondemos en minutos.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ===== WhatsApp — CTA PRIMARIO ===== */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <SectionReveal delay={0}>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-green-400">
                    WhatsApp
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    El canal más rápido. Respondemos en minutos.
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                Cuéntanos qué necesitas: tipo de servicio, cantidad, materiales.
                Te respondemos con cotización, tiempos y recomendaciones.
              </p>

              <a
                href="https://wa.me/525577196924"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Abrir WhatsApp
              </a>
            </div>
          </SectionReveal>

          {/* ===== Formulario — SECUNDARIO ===== */}
          <SectionReveal delay={0.1}>
            <div className="mt-6">
              <ContactForm />
            </div>
          </SectionReveal>
        </div>

        {/* ===== Visítanos — INFO TERCIARIA ===== */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <SectionReveal delay={0.2}>
            <div className="lg:sticky lg:top-24 space-y-5">
              <h2 className="font-heading text-xl font-bold">Visítanos</h2>

              <ContactoInfo />

              {/* Nota sutil */}
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Trabajamos con cita previa para darte atención personalizada.
                  Escríbenos antes de venir para asegurar que te atendemos sin
                  esperas.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
