"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Bot, Globe, Smartphone, Brain, Zap, ChevronRight, Terminal, Cpu, Layers } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

const services = [
  { icon: Globe, title: "Web Design", desc: "Sites modernos e performáticos" },
  { icon: Smartphone, title: "Apps Mobile", desc: "iOS & Android nativos" },
  { icon: Bot, title: "Agentes IA", desc: "Automação inteligente" },
  { icon: Brain, title: "Machine Learning", desc: "Modelos personalizados" },
  { icon: Code2, title: "Software Custom", desc: "Soluções à medida" },
  { icon: Zap, title: "Automação", desc: "Workflows inteligentes" },
];

const stats = [
  { value: "50+", label: "Projetos entregues" },
  { value: "99%", label: "Satisfação" },
  { value: "24h", label: "Suporte" },
  { value: "3x", label: "Mais rápido" },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-pattern" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
        
        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-40">
          <HeroScene />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 badge badge-accent mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span>Powered by AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-white">Criamos o</span>
            <br />
            <span className="gradient-text">Futuro Digital</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Web design, software personalizado e soluções de IA que transformam o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/contacto" className="btn-primary text-base">
              Começar Projeto
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ideias" className="btn-secondary text-base">
              Ver Possibilidades IA
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-neutral-900 bg-neutral-950/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="badge mb-4">
              <Terminal className="w-3 h-3" />
              <span>Serviços</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              O que fazemos
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl">
              Combinamos design, tecnologia e inteligência artificial para criar soluções que se destacam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900">
            {services.map((service, i) => (
              <div key={i} className="bg-black p-8 group hover:bg-neutral-950 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center mb-6 group-hover:bg-neutral-800 transition-colors">
                  <service.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.06)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-16">
            <div className="badge mb-4">
              <Brain className="w-3 h-3" />
              <span>Inteligência Artificial</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Poder da IA
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl">
              Descubra como a inteligência artificial pode revolucionar o seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Chatbot Inteligente", desc: "Atendimento 24/7 com IA que aprende com os seus clientes" },
              { title: "Geração de Conteúdo", desc: "Criação automática de textos, imagens e vídeos" },
              { title: "Análise Preditiva", desc: "Preveja tendências e comportamento dos clientes" },
              { title: "Assistente Virtual", desc: "Agente IA que gere o seu negócio por comandos naturais" },
            ].map((item, i) => (
              <div key={i} className="card card-glow group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-md bg-neutral-900 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-800 transition-colors">
                    <Cpu className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/ideias" className="btn-ghost group">
              Explorar todas as ideias
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6 mx-auto w-fit">
            <Layers className="w-3 h-3" />
            <span>Vamos começar</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Pronto para <span className="gradient-text">inovação</span>?
          </h2>
          <p className="text-neutral-500 text-lg mb-10 max-w-xl mx-auto">
            Transformamos a sua visão em realidade. Fale connosco e descubra o que a IA pode fazer pelo seu negócio.
          </p>
          <Link href="/contacto" className="btn-primary text-base px-8">
            Falar com Especialista
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
