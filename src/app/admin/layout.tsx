"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare, Settings, FileText,
  LogOut, Menu, X, BarChart3, Mail, Bot, TrendingUp
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projetos", label: "Projetos", icon: FolderOpen },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalProjects: 0,
    totalClients: 0,
    pendingMessages: 0,
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

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
      }
    }
    if (user) fetchStats();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-400">A verificar acesso...</div>
      </div>
    );
  }

  if (!user || profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center glass-panel p-8 rounded-2xl">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Acesso Restrito</h1>
          <p className="text-gray-400 mb-6">A sua conta não tem permissões de administrador.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.push("/")} className="btn-primary">Voltar ao Site</button>
            <button onClick={handleLogout} className="btn-secondary">Sair</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-[#12121a] border-r border-white/5 flex flex-col z-50 transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-black font-bold text-xs">CD</span>
            </div>
            <span className="font-[var(--font-space)] font-bold">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <link.icon className="w-5 h-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-[var(--font-space)] font-bold">Painel de Controlo</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Ver Site
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-black">
                {(profile?.displayName || user.email || "A")[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-300 hidden sm:block">{profile?.displayName || user.email}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
