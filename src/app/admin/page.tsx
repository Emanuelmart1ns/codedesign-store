"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { FolderOpen, Users, MessageSquare, TrendingUp, Bot, Mail, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalProjects: 0,
    totalClients: 0,
    pendingMessages: 0,
  });
  const [loading, setLoading] = useState(true);

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
    { label: "Contactos", value: stats.totalContacts, icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Projetos", value: stats.totalProjects, icon: FolderOpen, color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Clientes", value: stats.totalClients, icon: Users, color: "text-pink-400", bg: "bg-pink-500/10" },
    { label: "Pendentes", value: stats.pendingMessages, icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-display font-bold text-white mb-1">Visão Geral</h2>
        <p className="text-sm text-neutral-500">Resumo da atividade do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-md ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-0.5">{loading ? "—" : stat.value}</p>
            <p className="text-xs text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
          <h3 className="text-sm font-medium text-white mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/admin/projetos", icon: FolderOpen, label: "Projetos", color: "text-cyan-400" },
              { href: "/admin/clientes", icon: Users, label: "Clientes", color: "text-violet-400" },
              { href: "/admin/blog", icon: TrendingUp, label: "Blog", color: "text-pink-400" },
              { href: "/admin/configuracoes", icon: Settings, label: "Config", color: "text-amber-400" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-3 p-3 bg-black rounded-md hover:bg-neutral-800 transition-colors group">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">{item.label}</span>
                <ChevronRight className="w-3 h-3 text-neutral-600 ml-auto group-hover:text-neutral-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
          <h3 className="text-sm font-medium text-white mb-4">Estado do Sistema</h3>
          <div className="space-y-2">
            {[
              { label: "Firebase", status: "online" },
              { label: "Agente IA", status: "online" },
              { label: "Telegram Bot", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black rounded-md">
                <span className="text-xs text-neutral-400">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.status === "online" ? "bg-green-400" : "bg-amber-400"}`} />
                  <span className="text-xs text-neutral-500 capitalize">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
