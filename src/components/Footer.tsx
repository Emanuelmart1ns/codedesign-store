"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <span className="font-[var(--font-space)] text-xl font-bold">
                Code<span className="gradient-text">Design</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Criamos soluções digitais inovadoras com IA. Web design, apps, automações e software personalizado.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-400/20 transition-colors">
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-400/20 transition-colors">
                <Facebook className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-400/20 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Início</Link></li>
              <li><Link href="/ideias" className="text-gray-400 hover:text-cyan-400 transition-colors">Ideias IA</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors">Portfólio</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-cyan-400 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contactos</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                hello@codedesign.store
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                +351 912 345 678
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                Portugal
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CodeDesign Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
