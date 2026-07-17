"use client";

import Link from "next/link";
import Image from "next/image";
import HoverLink from "@/components/HoverLink";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import AccordionFAQ from "@/components/AccordionFAQ";

const servicios = [
  {
    titulo: "Serigrafía",
    desc: "Impresión de alta calidad sobre textiles, plásticos, vidrio y más.",
    href: "/servicios#serigrafia",
    icon: "🖨️",
  },
  {
    titulo: "Grabado láser",
    desc: "Marcado y grabado de precisión en metal, madera, acrílico y cuero.",
    href: "/servicios#grabado-laser",
    icon: "⚡",
  },
  {
    titulo: "Sublimación",
    desc: "Transferencia de imágenes a todo color sobre playeras, tazas y artículos promocionales.",
    href: "/servicios#sublimacion",
    icon: "🎨",
  },
  {
    titulo: "Lonas",
    desc: "Lonas publicitarias de gran formato para exteriores e interiores.",
    href: "/servicios#lonas",
    icon: "🏗️",
  },
];

const faqs = [
  {
    q: "¿Cuál es el pedido mínimo?",
    a: "Depende de la técnica. En serigrafía pedimos mínimo 10 piezas. Para sublimación y grabado láser aceptamos desde 1 pieza. Contáctanos para casos especiales.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    a: "La mayoría de los pedidos se entregan en 3 a 7 días hábiles después de aprobar el diseño. Pedidos grandes o urgentes tienen prioridad — pregúntanos.",
  },
  {
    q: "¿Qué formatos de archivo aceptan para los diseños?",
    a: "Preferimos vectores: PDF, AI, SVG o CDR. También aceptamos PNG y JPG en alta resolución (300 DPI mínimo). Si tienes duda, mándanos lo que tengas y lo revisamos.",
  },
  {
    q: "¿Hacen envíos a toda la república?",
    a: "Sí. Enviamos por paquetería a cualquier parte de México. El costo depende del peso, volumen y destino. Pedidos mayores a $2,500 tienen envío desde $50.",
  },
  {
    q: "¿Puedo ver una muestra antes del pedido completo?",
    a: "Claro. Podemos hacer una pieza muestra para que apruebes colores, registro y calidad antes de producir el tiraje completo. La muestra tiene costo, pero se descuenta del pedido final.",
  },
];

const trabajos = [
  { nombre: "Playeras corporativas", servicio: "Serigrafía", categoria: "serigrafia" },
  { nombre: "Tazas personalizadas", servicio: "Sublimación", categoria: "sublimacion" },
  { nombre: "Termos grabados", servicio: "Grabado láser", categoria: "grabado-laser" },
  { nombre: "Lona publicitaria", servicio: "Lonas", categoria: "lonas" },
  { nombre: "Uniformes deportivos", servicio: "Serigrafía", categoria: "serigrafia" },
  { nombre: "Llaveros metálicos", servicio: "Grabado láser", categoria: "grabado-laser" },
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
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven transforms — animaciones MUY temprano, luego pausa larga
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Logo: escala 1.6→1 en primeros 5%, visible hasta 10%, luego fade
  const titleScale = useTransform(scrollYProgress, [0, 0.05], [1.6, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0.2]);
  // Subtítulo: 3%→8%
  const subtitleOpacity = useTransform(scrollYProgress, [0.03, 0.08], [0, 1]);
  // Botones: 5%→10%
  const buttonsOpacity = useTransform(scrollYProgress, [0.05, 0.10], [0, 1]);
  // Slide-up sutil
  const subtitleY = useTransform(scrollYProgress, [0.02, 0.08], [20, 0]);
  const buttonsY = useTransform(scrollYProgress, [0.04, 0.10], [25, 0]);

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
      {/* Hero — sticky slider con scroll-driven reveal */}
      <section ref={heroRef} className="relative h-[250vh]">
        {/* Slider fijo mientras se scrollea la sección */}
        <div
          onMouseMove={handleMouseMove}
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
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

          {/* Contenido animado por scroll */}
          <div className="relative z-20 text-center text-white px-4">
            <motion.h1
              style={{ scale: titleScale, opacity: titleOpacity }}
              className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight origin-center"
            >
              Más<span className="text-[var(--accent)]">Imagen</span>
            </motion.h1>
            <motion.p
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="mt-6 text-lg sm:text-xl text-gray-200 max-w-xl mx-auto"
            >
              Taller de impresiones con años de experiencia. Calidad y trato
              directo en cada proyecto.
            </motion.p>
            <motion.div
              style={{ opacity: buttonsOpacity, y: buttonsY }}
              className="mt-8 flex justify-center gap-4"
            >
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
            </motion.div>
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
              Cubrimos todo el espectro de impresión y marcado para tu negocio o
              proyecto personal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicios.map((srv) => (
              <Link
                key={srv.titulo}
                href={srv.href}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <span className="text-3xl">{srv.icon}</span>
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

      {/* Portafolio */}
      <SectionReveal delay={0.1}>
        <section id="portafolio" className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Trabajos recientes
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-lg mx-auto">
                Una muestra de lo que hacemos. Cada pieza con el cuidado que tu
                proyecto merece.
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
                onClick={() => setFiltroActivo("grabado-laser")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  filtroActivo === "grabado-laser"
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Grabado láser
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

            {/* FIXME: reemplazar con imágenes reales cuando estén disponibles */}
            <AnimatePresence>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                {trabajosFiltrados.map((trabajo) => (
                  <motion.div
                    key={trabajo.nombre}
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] aspect-[4/3] flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-accent"
                  >
                    <p className="text-4xl mb-3 opacity-30">🖼️</p>
                    <h3 className="font-heading text-sm font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {trabajo.nombre}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      {trabajo.servicio}
                    </p>
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
