"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Check, Zap, Terminal, Star } from "lucide-react";

const projects = [
  {
    title: "Vila CBD",
    desc: "Loja online completa com agente IA via Telegram que gere todo o negócio por comandos de linguagem natural",
    tags: ["Next.js", "Firebase", "Stripe", "IA", "Telegram Bot"],
    category: "E-commerce + IA",
    gradient: "from-emerald-600 to-emerald-900",
    features: ["Chat de suporte em tempo real", "Painel admin completo", "Agente IA via Telegram", "Pagamentos Stripe"],
  },
  {
    title: "Dashboard Analytics",
    desc: "Painel de controlo com visualização de dados em tempo real e previsões com machine learning",
    tags: ["React", "D3.js", "Python", "TensorFlow"],
    category: "Data & IA",
    gradient: "from-violet-600 to-violet-900",
    features: ["Gráficos interativos", "Previsões ML", "Alertas automáticos", "Relatórios PDF"],
  },
  {
    title: "App de Gestão",
    desc: "Aplicação mobile para gestão de equipas e projetos com notificações push e sincronização em tempo real",
    tags: ["React Native", "Firebase", "Node.js"],
    category: "Mobile App",
    gradient: "from-cyan-600 to-cyan-900",
    features: ["Tempo real", "Push notifications", "Offline mode", "Gestão de tarefas"],
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <section className="py-24 px-6 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="badge mb-6">
            <Star className="w-3 h-3" />
            <span>Os Nossos Trabalhos</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Portfólio
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl">
            Projetos que demonstram a nossa capacidade de inovar e entregar soluções de excelência.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-px bg-neutral-900 border border-neutral-900">
          {projects.map((project, i) => (
            <div key={i} className="bg-black group">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">{project.category}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-neutral-500 mb-6 max-w-lg">{project.desc}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-xs font-medium text-neutral-600 uppercase tracking-wider mb-3">Funcionalidades</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-sm text-neutral-400">
                          <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, ti) => (
                      <span key={ti} className="px-2.5 py-1 bg-neutral-900 rounded text-xs text-neutral-500 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href="/contacto" className="btn-primary w-fit">
                    Projeto Similar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`lg:w-96 min-h-[240px] lg:min-h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <div className="text-center text-white/60">
                    <Code2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-mono">{project.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Quer ser o próximo caso de sucesso?
          </h2>
          <p className="text-neutral-500 mb-8">
            Vamos criar algo incrível juntos.
          </p>
          <Link href="/contacto" className="btn-primary">
            Iniciar Projeto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
