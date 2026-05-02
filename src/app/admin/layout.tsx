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
  LogOut, Menu, X, BarChart3, Mail, Bot, TrendingUp, ChevronRight
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-neutral-500 text-sm">A verificar acesso...</div>
      </div>
    );
  }

  if (!user || profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-sm p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Acesso Restrito</h1>
          <p className="text-neutral-500 mb-6 text-sm">A sua conta não tem permissões de administrador.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push("/")} className="btn-primary text-sm">Voltar ao Site</button>
            <button onClick={handleLogout} className="btn-secondary text-sm">Sair</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 h-screen w-60 bg-black border-r border-neutral-900 flex flex-col z-50 transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-neutral-900">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" fill="black"/>
                <rect x="9" y="1" width="6" height="6" rx="1" fill="black" opacity="0.4"/>
                <rect x="1" y="9" width="6" height="6" rx="1" fill="black" opacity="0.4"/>
                <rect x="9" y="9" width="6" height="6" rx="1" fill="black" opacity="0.2"/>
              </svg>
            </div>
            <span className="font-display text-sm font-semibold text-white">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-sm"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-neutral-900">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-sm">
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-neutral-900 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-neutral-400" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-display font-semibold text-white">Painel de Controlo</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
              Ver Site
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium text-white">
                {(profile?.displayName || user.email || "A")[0].toUpperCase()}
              </div>
              <span className="text-xs text-neutral-400 hidden sm:block">{profile?.displayName || user.email?.split("@")[0]}</span>
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
