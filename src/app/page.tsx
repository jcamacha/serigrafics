"use client";

import Link from "next/link";
import Image from "next/image";
import HoverLink from "@/components/HoverLink";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import AccordionFAQ from "@/components/AccordionFAQ";

const servicios = [
  {
    titulo: "Serigrafía en botellas",
    desc: "Impresión industrial de alta definición sobre botellas de vidrio, plástico, termos, vasos y envases cilíndricos.",
    href: "/servicios#serigrafia",
    img: "/servicio-serigrafia.jpg",
  },
  {
    titulo: "Sublimación",
    desc: "Transferencia de imágenes a todo color sobre botellas plásticas, termos, tazas y artículos promocionales.",
    href: "/servicios#sublimacion",
    img: "/servicio-sublimacion.jpg",
  },
  {
    titulo: "Lonas",
    desc: "Impresión publicitaria de gran formato en lona de alta resistencia para publicidad exterior e interior.",
    href: "/servicios#lonas",
    img: "/servicio-lonas.webp",
  },
];

const faqs = [
  {
    q: "¿Cuál es el pedido mínimo?",
    a: "Depende de la técnica. En serigrafía para botellas y envases pedimos mínimo 10 piezas. Para sublimación aceptamos desde 1 pieza. Contáctanos para proyectos industriales o tirajes especiales.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    a: "La mayoría de los pedidos se entregan en 3 a 7 días hábiles después de aprobar el diseño y muestras. Pedidos grandes o urgentes tienen prioridad — pregúntanos.",
  },
  {
    q: "¿Qué formatos de archivo aceptan para los diseños?",
    a: "Preferimos vectores: PDF, AI, SVG o CDR. También aceptamos PNG y JPG en alta resolución (300 DPI mínimo). Si tienes duda, mándanos lo que tengas y lo revisamos.",
  },
  {
    q: "¿Hacen envíos a toda la república?",
    a: "Sí. Enviamos por paquetería a cualquier parte de México. El costo depende del peso, volumen y destino.",
  },
  {
    q: "¿Puedo ver una muestra antes del pedido completo?",
    a: "Claro. Ofrecemos muestras previas para garantizar el tono, registro y adhesión adecuados en tus botellas o envases antes de producir el tiraje completo.",
  },
];

const trabajos = [
  { nombre: "Botella ámbar 250ml", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-ambar-250ml.png" },
  { nombre: "Botella ámbar manos", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-ambar-manos.png" },
  { nombre: "Botella ámbar 500ml", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-ambar-cuerpo-500ml.png" },
  { nombre: "Botella aluminio 500ml", servicio: "Serigrafía cilíndrica", categoria: "serigrafia", img: "/portfolio/botella-aluminio-500ml.png" },
  { nombre: "Botella Boston 500ml", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-boston-500ml.png" },
  { nombre: "Botella Bordalesa", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-bordalesa.png" },
  { nombre: "Botella Bordalesa Tiante", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-bordalesa-tiante.png" },
  { nombre: "Botella Liverpool 750ml", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-liverpool-750ml.png" },
  { nombre: "Botella Liverpool Pirámide", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/botella-liverpool-piramide.png" },
  { nombre: "Frasco cuadrado", servicio: "Serigrafía en vidrio", categoria: "serigrafia", img: "/portfolio/frasco-cuadrado.png" },
  { nombre: "Frasco Hydra Fix", servicio: "Serigrafía cosmética", categoria: "serigrafia", img: "/portfolio/frasco-hydra-fix.png" },
  { nombre: "Frasco Moringa", servicio: "Serigrafía cosmética", categoria: "serigrafia", img: "/portfolio/frasco-moringa.jpg" },
];

const slides = [
  "/slide-1.jpg",
  "/slide-2.jpg",
  "/slide-3.jpg",
];

export default function Home() {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const trabajosFiltrados = filtroActivo === "todos"
    ? trabajos
    : trabajos.filter((trabajo) => trabajo.categoria === filtroActivo);

  return (
    <>
      {/* Hero — slider con animación al cargar */}
      <section
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {slides.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              style={{
                transform: index === currentSlide
                  ? `translate(${(mousePosition.x - 0.5) * -8}%, ${(mousePosition.y - 0.5) * -8}%) scale(1.08)`
                  : "none",
                transition: "transform 0.8s ease-out",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Contenido animado al cargar */}
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="font-heading text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight origin-center"
          >
            Serigra<span className="text-[var(--accent)]">fics</span>
          </motion.h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-xl mx-auto">
            Especialistas en impresión sobre botellas, termos y envases. Calidad industrial con trato personalizado.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/servicios"
              className="inline-flex items-center rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
            >
              Ver servicios
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios — Bento Grid */}
      <SectionReveal delay={0}>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Nuestros servicios
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
              Especializados en decoración de botellas y envases, además de servicios de marcado y gran formato.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicios.map((srv) => (
              <Link
                key={srv.titulo}
                href={srv.href}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={srv.img}
                    alt={srv.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
                  {srv.titulo}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {srv.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* Confían en nosotros */}
      <SectionReveal delay={0.05}>
        <section className="border-t border-[var(--border)] bg-[var(--card)]/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Confían en nosotros
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
                Garantía de calidad y precisión industrial para tus proyectos.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                "Más de 15 años de experiencia",
                "Envíos a toda la república",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                  <svg className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-sm text-[var(--foreground)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Marcas con las que hemos trabajado */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-8">
            Empresas que han trabajado con nosotros
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { name: "Chemisette", url: "https://chemisette.com.mx/", logo: "https://chemisette-web.s3.us-west-2.amazonaws.com/uploads/chemisette/logo/logo-25ch.png", dark: false },
              { name: "Desplastifícate", url: "https://www.desplastificate.com.mx/", logo: "https://www.desplastificate.com.mx/cdn/shop/files/desplastificate-logo_240x.svg?v=1758653646", dark: false },
              { name: "Hopsis", url: "https://hopsis.com/", logo: "https://hopsis.com/cdn/shop/files/este_fucking1.png?v=1614293994", dark: true },
              { name: "Moringa Fresh & Wild", url: "https://moringafreshandwild.com/", logo: "https://moringafreshandwild.com/wp-content/uploads/2022/11/Moringa-Site-Logo.png", dark: false },
              { name: "MYS Stockholm", url: "https://mysstockholm.com/", logo: "https://mysstockholm.com/cdn/shop/files/logo_mys.png?v=1688685655&width=80", dark: true },
            ].map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 rounded-lg p-3 ${brand.dark ? "bg-gray-800" : ""}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <SectionReveal delay={0.1}>
        <section id="portafolio" className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Trabajos recientes
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
                Una muestra de nuestras impresiones en botellas, envases y promocionales.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setFiltroActivo("todos")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  filtroActivo === "todos"
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroActivo("serigrafia")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  filtroActivo === "serigrafia"
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Serigrafía
              </button>
              <button
                onClick={() => setFiltroActivo("sublimacion")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  filtroActivo === "sublimacion"
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Sublimación
              </button>
              <button
                onClick={() => setFiltroActivo("lonas")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  filtroActivo === "lonas"
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Lonas
              </button>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                {trabajosFiltrados.map((trabajo) => (
                  <motion.div
                    key={trabajo.nombre}
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] aspect-[4/3] transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[var(--accent)]/40"
                  >
                    <Image
                      src={trabajo.img}
                      alt={trabajo.nombre}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left">
                      <h3 className="font-heading text-sm sm:text-base font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                        {trabajo.nombre}
                      </h3>
                      <p className="text-xs text-gray-300 mt-0.5 font-medium">
                        {trabajo.servicio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            <div className="text-center mt-10">
              <HoverLink
                href="/contacto"
                className="inline-flex items-center rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                ¿Tienes un proyecto similar? Cotízalo
              </HoverLink>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ — con animación de expansión */}
      <SectionReveal delay={0.2}>
        <section id="faq" className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
                Respuestas rápidas a lo que más nos preguntan.
              </p>
            </div>
            <AccordionFAQ faqs={faqs} />
          </div>
        </section>
      </SectionReveal>

      {/* Garantía — RealThread inspired */}
      <SectionReveal delay={0.3}>
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Garantizamos calidad, precisión y entrega
              </h2>
              <p className="mt-4 text-[var(--muted-foreground)]">
                Cada pedido pasa por revisión de diseño, control de calidad y
                empaque cuidadoso.
              </p>
              <ul className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                {[
                  "Revisión de diseño sin costo",
                  "Materiales de primera calidad",
                  "Registro y color preciso",
                  "Entrega puntual garantizada",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA final */}
      <SectionReveal delay={0.4}>
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para empezar?
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] max-w-md mx-auto">
              Cuéntanos tu proyecto y te damos una cotización sin compromiso.
            </p>
            <HoverLink
              href="/contacto"
              className="mt-8 inline-flex items-center rounded-lg bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--accent)]/90 transition-colors"
            >
              Contáctanos
            </HoverLink>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
