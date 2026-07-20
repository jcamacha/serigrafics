"use client";

import Link from "next/link";
import HoverLink from "./HoverLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Fase 2: gate condicional para items de tracking/admin
const PHASE2 = process.env.NEXT_PUBLIC_PHASE2 === "true";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  phase2?: boolean;
}

const baseItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Serigrafía", href: "/servicios#serigrafia" },
      { label: "Tampografía", href: "/servicios#tampografia" },
      { label: "Grabado láser", href: "/servicios#grabado-laser" },
      { label: "Sublimación", href: "/servicios#sublimacion" },
      { label: "Lonas", href: "/servicios#lonas" },
    ],
  },
  { label: "Portafolio", href: "/#portafolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Productos", href: "/productos" },
  { label: "Cotización", href: "/cotizacion" },
  { label: "Contacto", href: "/contacto" },
];

const phase2Items: NavItem[] = [
  { label: "Rastreo", href: "/rastreo", phase2: true },
];

function getNavItems(): NavItem[] {
  if (!PHASE2) return baseItems;
  // Insertar "Rastreo" antes de "Contacto"
  const items = [...baseItems];
  items.splice(items.length - 1, 0, ...phase2Items);
  return items;
}

export default function Header() {
  const navItems = getNavItems();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  // Transparente hasta ~80vh de scroll (cubre todo el fade del hero)
  const isTransparent = isHome && !scrolled && !mobileOpen;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent
        ? "bg-transparent border-transparent"
        : "border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80"
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`font-heading text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              Más<span className={`transition-colors duration-300 ${isTransparent ? "text-white" : "text-[var(--accent)]"}`}>Imagen</span>
            </Link>
            <span className={`hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] border-l pl-3 transition-colors duration-300 ${
              isTransparent
                ? "text-white/60 border-white/20"
                : "text-[var(--muted-foreground)] border-[var(--border)]"
            }`}>
              Desde 2010
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <HoverLink
                  href={item.href}
                  active={isActive(item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                    isTransparent
                      ? "text-white hover:text-white/80"
                      : isActive(item.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className={`ml-1 inline-block h-3 w-3 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </HoverLink>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden p-2 transition-colors duration-300 ${
              isTransparent
                ? "text-white hover:text-white/80"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] py-3 space-y-1 animate-dropdown">
            {navItems.map((item) => (
              <div key={item.href}>
                <HoverLink
                  href={item.href}
                  active={isActive(item.href)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </HoverLink>
                {item.children && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
