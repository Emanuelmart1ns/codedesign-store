"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Bot, Globe, Smartphone, Brain, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

const services = [
  { icon: Globe, title: "Web Design", desc: "Sites modernos, responsivos e otimizados para conversão" },
  { icon: Smartphone, title: "Apps Mobile", desc: "Aplicações nativas e cross-platform de alta performance" },
  { icon: Bot, title: "Agentes IA", desc: "Automação inteligente com IA para o seu negócio" },
  { icon: Brain, title: "Machine Learning", desc: "Modelos personalizados para análise e previsão" },
  { icon: Code2, title: "Software Custom", desc: "Soluções à medida para problemas específicos" },
  { icon: Zap, title: "Automação", desc: "Workflows automatizados que poupam tempo e dinheiro" },
];

const aiIdeas = [
  { title: "Chatbot Inteligente", desc: "Atendimento 24/7 com IA que aprende com os seus clientes" },
  { title: "Geração de Conteúdo", desc: "Criação automática de textos, imagens e vídeos" },
  { title: "Análise Preditiva", desc: "Preveja tendências e comportamento dos clientes" },
  { title: "Assistente Virtual", desc: "Agente IA que gere o seu negócio por comandos de voz" },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Powered by Artificial Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[var(--font-space)] font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Criamos o <span className="gradient-text">Futuro</span>
            <br />Digital
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Web design, software personalizado e soluções de IA que transformam o seu negócio numa máquina de inovação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link href="/contacto" className="btn-primary text-lg px-8">
              Começar Projeto
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </Link>
            <Link href="/ideias" className="btn-secondary text-lg px-8">
              Ver Possibilidades IA
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold mb-4">
              O Que <span className="gradient-text">Fazemos</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Combinamos design, tecnologia e inteligência artificial para criar soluções que se destacam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-2xl hover:border-cyan-400/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:from-cyan-400/30 group-hover:to-purple-500/30 transition-all">
                  <service.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-[var(--font-space)] font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold mb-4">
              Poder da <span className="gradient-text">IA</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubra como a inteligência artificial pode revolucionar o seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiIdeas.map((idea, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-[var(--font-space)] font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-gray-400">{idea.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/ideias" className="btn-secondary">
              Explorar Todas as Ideias
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold mb-6">
            Pronto para <span className="gradient-text">Inovar</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Vamos transformar a sua visão em realidade. Fale connosco e descubra o que a IA pode fazer pelo seu negócio.
          </p>
          <Link href="/contacto" className="btn-primary text-lg px-12 py-4">
            Falar com Especialista
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
