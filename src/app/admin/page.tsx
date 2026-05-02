"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { FolderOpen, Users, MessageSquare, TrendingUp, Bot, Mail, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalProjects: 0,
    totalClients: 0,
    pendingMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const headers = await getAdminAuthHeaders();
        const res = await fetch("/api/admin/stats", { headers });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Contactos", value: stats.totalContacts, icon: MessageSquare, color: "text-cyan-400", trend: "+12%" },
    { label: "Projetos", value: stats.totalProjects, icon: FolderOpen, color: "text-purple-400", trend: "+5%" },
    { label: "Clientes", value: stats.totalClients, icon: Users, color: "text-pink-400", trend: "+8%" },
    { label: "Mensagens Pendentes", value: stats.pendingMessages, icon: Mail, color: "text-yellow-400", trend: "-3%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-[var(--font-space)] font-bold mb-2">Visão Geral</h2>
        <p className="text-gray-400">Resumo da atividade do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className={`text-xs font-medium flex items-center gap-1 ${stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stat.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{loading ? "..." : stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/projetos" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
              <FolderOpen className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <span className="text-sm">Gerir Projetos</span>
            </Link>
            <Link href="/admin/clientes" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <span className="text-sm">Ver Clientes</span>
            </Link>
            <Link href="/admin/blog" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-pink-400" />
              <span className="text-sm">Gerir Blog</span>
            </Link>
            <Link href="/admin/configuracoes" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center">
              <Bot className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <span className="text-sm">Configurações</span>
            </Link>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Estado do Sistema</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-gray-300">Firebase Conectado</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-gray-300">Agente IA via Telegram</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-gray-300">Google AdSense</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
