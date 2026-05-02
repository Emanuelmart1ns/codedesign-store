"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/ideias", label: "Ideias IA" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-neutral-900" : ""}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill="black"/>
                  <rect x="9" y="1" width="6" height="6" rx="1" fill="black" opacity="0.4"/>
                  <rect x="1" y="9" width="6" height="6" rx="1" fill="black" opacity="0.4"/>
                  <rect x="9" y="9" width="6" height="6" rx="1" fill="black" opacity="0.2"/>
                </svg>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                Code<span className="text-neutral-500">Design</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    pathname === link.href ? "text-white bg-neutral-900" : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/contacto" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                Pedir Orçamento
              </Link>
              <button className="md:hidden text-neutral-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col pt-20 px-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xl font-display py-3 border-b border-neutral-900 ${
                  pathname === link.href ? "text-white" : "text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/contacto" onClick={() => setMobileOpen(false)} className="mt-8 btn-primary text-base w-full justify-center">
            <Sparkles className="w-4 h-4" />
            Pedir Orçamento
          </Link>
        </div>
      )}
    </>
  );
}
