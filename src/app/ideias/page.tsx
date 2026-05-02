"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain, MessageSquare, Image, BarChart3, Shield, Zap, Globe, Code2, Smartphone, Bot, Eye, Mic, Database, Workflow, TrendingUp, Users, FileText, Video, Palette, Search, Clock, CreditCard, MapPin, Calendar, Mail, Phone, Star, CheckCircle, AlertCircle, Info, ExternalLink, Copy, Download, Upload, Settings, Bell, Heart, Share2, Bookmark, ThumbsUp, ThumbsDown, Flag, Edit, Trash2, Plus, Minus, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search as SearchIcon, Filter, SortAsc, SortDesc, Grid, List, MoreHorizontal, MoreVertical, Menu, X as XIcon } from "lucide-react";

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
    icon: Workflow,
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
    icon: CreditCard,
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
    <main className="min-h-screen bg-[#0a0a0f] pt-24">
      {/* Header */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Possibilidades Infinitas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-[var(--font-space)] font-bold mb-6">
            O que a <span className="gradient-text">IA</span> pode fazer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore as infinitas possibilidades da inteligência artificial aplicada ao seu negócio.
            Cada solução é personalizada para as suas necessidades.
          </p>
        </div>
      </section>

      {/* Ideas Grid */}
      <section className="py-16 px-6 grid-bg">
        <div className="max-w-7xl mx-auto">
          {aiIdeas.map((category, idx) => (
            <div key={idx} className="mb-12">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                className="w-full flex items-center justify-between glass-panel p-6 rounded-2xl hover:border-cyan-400/30 transition-all mb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-[var(--font-space)] font-bold">{category.category}</h2>
                    <p className="text-gray-400 text-sm">{category.ideas.length} soluções disponíveis</p>
                  </div>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${expandedCategory === category.category ? "rotate-180" : ""}`} />
              </button>

              {expandedCategory === category.category && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-16">
                  {category.ideas.map((idea, i) => (
                    <div key={i} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-all">
                      <h3 className="text-lg font-bold mb-2 text-cyan-400">{idea.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{idea.desc}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">{idea.impact}</span>
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
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-[var(--font-space)] font-bold mb-4">
            Tem uma ideia em mente?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Transformamos qualquer conceito em realidade. Fale connosco e vamos criar algo incrível juntos.
          </p>
          <Link href="/contacto" className="btn-primary text-lg px-8">
            Pedir Orçamento Grátis
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
