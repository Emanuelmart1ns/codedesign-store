"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Save, TestTube, Bot, Settings, Globe, Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("CodeDesign Store");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [socials, setSocials] = useState({
    instagram: "", facebook: "", twitter: "", linkedin: "", github: "",
    telegramToken: "", telegramChatId: "",
  });
  const [saveMessage, setSaveMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.storeName) setStoreName(data.storeName);
          if (data.email) setEmail(data.email);
          if (data.phone) setPhone(data.phone);
          if (data.address) setAddress(data.address);
          if (data.socials) setSocials({ ...socials, ...data.socials });
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage("A guardar...");
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeName, email, phone, address, socials, idToken }),
      });
      if (res.ok) setSaveMessage("Definições guardadas! ✅");
    } catch (error) {
      setSaveMessage("Erro ao guardar.");
    }
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleTestTelegram = async () => {
    setSaveMessage("A enviar teste...");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Admin Test", text: "Teste de ligação do painel CodeDesign Store! 🚀" }),
      });
      setSaveMessage(res.ok ? "Teste enviado! ✅" : "Erro no teste ❌");
    } catch (error) {
      setSaveMessage("Erro de ligação.");
    }
    setTimeout(() => setSaveMessage(""), 5000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <div className="text-gray-400">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-[var(--font-space)] font-bold">Configurações</h2>
        <p className="text-gray-400">Gerir definições do site e integrações</p>
      </div>

      {saveMessage && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Dados do Site
          </h3>
          <input type="text" placeholder="Nome do Site" value={storeName} onChange={e => setStoreName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Morada" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </form>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Telegram Bot
          </h3>
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-300">
            <strong>Configuração:</strong><br />
            1. Crie um bot com @BotFather e copie o token<br />
            2. Obtenha o seu Chat ID com @userinfobot<br />
            3. Cole abaixo e teste
          </div>
          <input type="password" placeholder="Bot Token" value={socials.telegramToken} onChange={e => setSocials({...socials, telegramToken: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Chat ID" value={socials.telegramChatId} onChange={e => setSocials({...socials, telegramChatId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <button type="button" onClick={handleTestTelegram} className="btn-secondary flex items-center gap-2 w-full justify-center">
            <TestTube className="w-4 h-4" />
            Testar Ligação
          </button>
        </div>

        <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-400" />
            Redes Sociais
          </h3>
          <input type="text" placeholder="Instagram URL" value={socials.instagram} onChange={e => setSocials({...socials, instagram: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Facebook URL" value={socials.facebook} onChange={e => setSocials({...socials, facebook: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="LinkedIn URL" value={socials.linkedin} onChange={e => setSocials({...socials, linkedin: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="GitHub URL" value={socials.github} onChange={e => setSocials({...socials, github: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar Redes
          </button>
        </form>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4 text-red-400">Sessão</h3>
          <p className="text-gray-400 mb-4">Autenticado como admin.</p>
          <button onClick={handleLogout} className="btn-secondary w-full flex items-center justify-center gap-2 border-red-400/30 text-red-400 hover:bg-red-500/10">
            Terminar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}
