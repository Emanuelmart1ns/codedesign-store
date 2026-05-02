"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-black border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
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
            <p className="text-neutral-500 mb-6 max-w-sm text-sm leading-relaxed">
              Criamos soluções digitais inovadoras com IA. Web design, apps, automações e software personalizado.
            </p>
            <div className="flex gap-3">
              {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors text-neutral-500 hover:text-white">
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Navegação</h4>
            <ul className="space-y-2.5">
              {["Início", "Ideias IA", "Portfólio", "Contacto"].map((item, i) => (
                <li key={i}>
                  <Link href={["/", "/ideias", "/portfolio", "/contacto"][i]} className="text-sm text-neutral-500 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Contactos</h4>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>hello@codedesign.store</li>
              <li>+351 912 345 678</li>
              <li>Portugal</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} CodeDesign Store. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
