"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Zap, Globe, Smartphone, Bot, Brain, CheckCircle, Star } from "lucide-react";

const projects = [
  {
    title: "Vila CBD",
    desc: "Loja online completa com agente IA via Telegram que gere todo o negócio por comandos de linguagem natural",
    tags: ["Next.js", "Firebase", "Stripe", "IA", "Telegram Bot"],
    category: "E-commerce + IA",
    image: "linear-gradient(135deg, #10b981, #059669)",
    features: ["Chat de suporte em tempo real", "Painel admin completo", "Agente IA via Telegram", "Pagamentos Stripe"],
  },
  {
    title: "Dashboard Analytics",
    desc: "Painel de controlo com visualização de dados em tempo real e previsões com machine learning",
    tags: ["React", "D3.js", "Python", "TensorFlow"],
    category: "Data & IA",
    image: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    features: ["Gráficos interativos", "Previsões ML", "Alertas automáticos", "Relatórios PDF"],
  },
  {
    title: "App de Gestão",
    desc: "Aplicação mobile para gestão de equipas e projetos com notificações push e sincronização em tempo real",
    tags: ["React Native", "Firebase", "Node.js"],
    category: "Mobile App",
    image: "linear-gradient(135deg, #00f5ff, #0891b2)",
    features: ["Tempo real", "Push notifications", "Offline mode", "Gestão de tarefas"],
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24">
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Os Nossos Trabalhos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-[var(--font-space)] font-bold mb-6">
            <span className="gradient-text">Portfólio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Projetos que demonstram a nossa capacidade de inovar e entregar soluções de excelência.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 grid-bg">
        <div className="max-w-7xl mx-auto">
          {projects.map((project, i) => (
            <div key={i} className="glass-panel rounded-3xl overflow-hidden mb-12 hover:border-cyan-400/30 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4" />
                    {project.category}
                  </div>
                  <h2 className="text-3xl font-[var(--font-space)] font-bold mb-4">{project.title}</h2>
                  <p className="text-gray-400 mb-6">{project.desc}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Funcionalidades:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, ti) => (
                      <span key={ti} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href="/contacto" className="btn-primary self-start">
                    Projeto Similar
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Link>
                </div>
                <div className="min-h-[300px] lg:min-h-full" style={{ background: project.image }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white/80">
                      <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Projeto {project.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-[var(--font-space)] font-bold mb-4">
            Quer ser o próximo caso de sucesso?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Vamos criar algo incrível juntos.
          </p>
          <Link href="/contacto" className="btn-primary text-lg px-8">
            Iniciar Projeto
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
