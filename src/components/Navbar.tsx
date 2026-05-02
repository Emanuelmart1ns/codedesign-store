"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu, Code2, Sparkles, MessageSquare } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${scrolled ? "glass-panel rounded-2xl mx-4" : ""}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-shadow">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <span className="font-[var(--font-space)] text-xl font-bold">
                Code<span className="gradient-text">Design</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    pathname === link.href ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contacto" className="btn-primary text-sm">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Pedir Orçamento
              </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-[var(--font-space)] hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">
            <Sparkles className="w-5 h-5 inline mr-2" />
            Pedir Orçamento
          </Link>
        </div>
      )}
    </>
  );
}
