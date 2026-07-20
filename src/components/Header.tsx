"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-xl font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            Más<span className="text-[var(--accent)]">Imagen</span>
          </Link>

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
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
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
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="animate-dropdown absolute left-0 top-full mt-1 w-48 rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-lg">
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
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
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
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
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
