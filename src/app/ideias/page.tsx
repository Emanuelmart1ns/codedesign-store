"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Image, BarChart3, Shield, Zap, Brain, ChevronDown, ChevronRight, Terminal } from "lucide-react";

const aiIdeas = [
  {
    category: "Atendimento & Chat",
    icon: MessageSquare,
    ideas: [
      { title: "Chatbot Inteligente 24/7", desc: "IA que responde clientes automaticamente, aprende com interações e escala para humano quando necessário", impact: "Redução de 80% no tempo de resposta" },
      { title: "Assistente Virtual Personalizado", desc: "Agente IA com a personalidade da sua marca que gere agendamentos, FAQs e suporte técnico", impact: "Disponibilidade total sem custos adicionais" },
      { title: "Análise de Sentimento", desc: "Deteta automaticamente a satisfação do cliente em tempo real e alerta para situações críticas", impact: "Retenção de clientes aumentada em 40%" },
    ],
  },
  {
    category: "Conteúdo & Marketing",
    icon: Image,
    ideas: [
      { title: "Geração de Conteúdo Automático", desc: "Criação de posts, artigos, descrições de produtos e emails marketing com IA generativa", impact: "10x mais conteúdo produzido" },
      { title: "Geração de Imagens & Vídeos", desc: "Criação de visuais únicos para campanhas, produtos e redes sociais com IA", impact: "Redução de 90% em custos de design" },
      { title: "SEO Inteligente", desc: "Otimização automática de conteúdo para motores de busca com análise de keywords e tendências", impact: "Aumento de tráfego orgânico em 150%" },
      { title: "Personalização de Campanhas", desc: "IA que adapta mensagens e ofertas para cada perfil de cliente automaticamente", impact: "Conversão aumentada em 60%" },
    ],
  },
  {
    category: "Análise & Previsão",
    icon: BarChart3,
    ideas: [
      { title: "Dashboard Preditivo", desc: "Visualização de dados com previsões de vendas, tendências e comportamento do mercado", impact: "Decisões 3x mais assertivas" },
      { title: "Análise de Concorrência", desc: "Monitorização automática de preços, produtos e estratégias da concorrência", impact: "Vantagem competitiva em tempo real" },
      { title: "Previsão de Stock", desc: "IA que prevê necessidades de inventário baseado em histórico, sazonalidade e tendências", impact: "Redução de 50% em stock parado" },
    ],
  },
  {
    category: "Automação & Processos",
    icon: Zap,
    ideas: [
      { title: "Gestão por Comandos de Voz", desc: "Controle todo o seu negócio através de comandos naturais via Telegram ou assistente de voz", impact: "Gestão 5x mais rápida" },
      { title: "Processamento de Documentos", desc: "IA que lê, classifica e extrai dados de faturas, contratos e formulários automaticamente", impact: "Redução de 95% em trabalho manual" },
      { title: "Workflow Inteligente", desc: "Automação de processos que se adapta e aprende com os padrões da equipa", impact: "Eficiência operacional aumentada em 70%" },
      { title: "Agendamento Automático", desc: "IA que gere calendários, marca reuniões e otimiza a agenda da equipa", impact: "Poupança de 10h/semana por colaborador" },
    ],
  },
  {
    category: "Segurança & Compliance",
    icon: Shield,
    ideas: [
      { title: "Detecção de Fraude", desc: "IA que analisa padrões de transações e alerta para atividades suspeitas em tempo real", impact: "Redução de 99% em fraudes" },
      { title: "Verificação de Identidade", desc: "Sistema biométrico com IA para validação segura de utilizadores", impact: "Segurança máxima sem fricção" },
      { title: "Monitorização de Compliance", desc: "Verificação automática de conformidade com regulamentações e políticas internas", impact: "Risco legal reduzido em 85%" },
    ],
  },
  {
    category: "E-commerce & Vendas",
    icon: BarChart3,
    ideas: [
      { title: "Recomendações Personalizadas", desc: "Sistema de recomendação tipo Netflix/Amazon que sugere produtos relevantes", impact: "Aumento de 35% no ticket médio" },
      { title: "Preços Dinâmicos", desc: "IA que ajusta preços automaticamente baseado em demanda, concorrência e stock", impact: "Margem de lucro otimizada em 25%" },
      { title: "Descrições Automáticas", desc: "Geração automática de descrições de produtos otimizadas para conversão", impact: "Tempo de listing reduzido em 90%" },
    ],
  },
];

export default function IdeiasPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <section className="py-24 px-6 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="badge mb-6">
            <Brain className="w-3 h-3" />
            <span>Possibilidades Infinitas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            O que a <span className="gradient-text">IA</span> pode fazer
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl">
            Explore as infinitas possibilidades da inteligência artificial aplicada ao seu negócio.
            Cada solução é personalizada para as suas necessidades.
          </p>
        </div>
      </section>

      {/* Ideas */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {aiIdeas.map((category, idx) => (
            <div key={idx} className="mb-2">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                className="w-full flex items-center justify-between py-5 px-4 border-b border-neutral-900 hover:bg-neutral-950/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <category.icon className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                  <span className="text-lg font-display font-medium text-white">{category.category}</span>
                  <span className="text-sm text-neutral-600">{category.ideas.length} soluções</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${expandedCategory === category.category ? "rotate-180" : ""}`} />
              </button>

              {expandedCategory === category.category && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-900 border border-neutral-900 mb-2">
                  {category.ideas.map((idea, i) => (
                    <div key={i} className="bg-black p-6 group hover:bg-neutral-950 transition-colors">
                      <h3 className="text-sm font-display font-semibold text-white mb-2">{idea.title}</h3>
                      <p className="text-xs text-neutral-500 mb-3">{idea.desc}</p>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs text-cyan-400">{idea.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Tem uma ideia em mente?
          </h2>
          <p className="text-neutral-500 mb-8">
            Transformamos qualquer conceito em realidade.
          </p>
          <Link href="/contacto" className="btn-primary">
            Pedir Orçamento Grátis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
