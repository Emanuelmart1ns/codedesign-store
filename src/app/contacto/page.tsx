"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Send, MessageSquare, Clock, Bot, CheckCircle, User, Building, FileText, ChevronRight, Terminal } from "lucide-react";

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
      <main className="min-h-screen bg-black pt-16 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">Mensagem Enviada!</h1>
          <p className="text-neutral-500 mb-8">Obrigado pelo seu contacto. A nossa equipa responderá em breve.</p>
          <Link href="/" className="btn-primary">
            Voltar ao Início
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-16">
      {/* Header */}
      <section className="py-24 px-6 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="badge mb-6">
            <MessageSquare className="w-3 h-3" />
            <span>Fale Connosco</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Vamos <span className="gradient-text">Conversar</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl">
            Tem um projeto em mente? Conte-nos a sua ideia e transformamo-la em realidade.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@codedesign.store" },
                { icon: Phone, label: "Telefone", value: "+351 912 345 678" },
                { icon: MapPin, label: "Localização", value: "Portugal" },
                { icon: Clock, label: "Horário", value: "Seg - Sex: 9h - 18h" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-0.5">{item.label}</h3>
                    <p className="text-sm text-neutral-500">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-0.5">Assistente IA</h3>
                    <p className="text-sm text-neutral-500 mb-3">Respostas instantâneas via Telegram</p>
                    <a href="https://t.me/CodeDesignBot" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
                      Abrir no Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Nome *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-neutral-600 focus:outline-none transition-colors placeholder:text-neutral-600"
                        placeholder="O seu nome"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-neutral-600 focus:outline-none transition-colors placeholder:text-neutral-600"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-neutral-600 focus:outline-none transition-colors placeholder:text-neutral-600"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Serviço</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-neutral-600 focus:outline-none transition-colors appearance-none"
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

                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Mensagem *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-white text-sm focus:border-neutral-600 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                    placeholder="Descreva o seu projeto ou ideia..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Enviar Mensagem
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
