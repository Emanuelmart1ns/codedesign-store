"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Send, MessageSquare, Calendar, Clock, Sparkles, Bot, CheckCircle, User, Building, FileText } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] pt-24 flex items-center justify-center px-6">
        <div className="text-center glass-panel p-12 rounded-3xl max-w-lg">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-[var(--font-space)] font-bold mb-4">Mensagem Enviada!</h1>
          <p className="text-gray-400 mb-8">Obrigado pelo seu contacto. A nossa equipa responderá em breve.</p>
          <Link href="/" className="btn-primary">Voltar ao Início</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24">
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Fale Connosco</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-[var(--font-space)] font-bold mb-6">
            Vamos <span className="gradient-text">Conversar</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tem um projeto em mente? Conte-nos a sua ideia e transformamo-la em realidade.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 grid-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-400">hello@codedesign.store</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-gray-400">+351 912 345 678</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Localização</h3>
                    <p className="text-gray-400">Portugal</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Horário</h3>
                    <p className="text-gray-400">Seg - Sex: 9h - 18h</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-cyan-400/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Assistente IA</h3>
                    <p className="text-gray-400 text-sm mb-3">Respostas instantâneas via Telegram</p>
                    <a href="https://t.me/CodeDesignBot" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm w-full block text-center">
                      Abrir no Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl">
                <h2 className="text-2xl font-[var(--font-space)] font-bold mb-6">Pedir Orçamento</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nome *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="O seu nome"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Serviço</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Selecionar...</option>
                        <option value="web">Web Design</option>
                        <option value="app">App Mobile</option>
                        <option value="ia">Solução IA</option>
                        <option value="software">Software Custom</option>
                        <option value="automacao">Automação</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Mensagem *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Descreva o seu projeto ou ideia..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full text-lg">
                  Enviar Mensagem
                  <Send className="w-5 h-5 inline ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
