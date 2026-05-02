"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Save, TestTube, Bot, Globe, Mail, Phone, MapPin, Clock, Link2, LogOut, Check } from "lucide-react";

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
      if (res.ok) setSaveMessage("Definições guardadas!");
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
        body: JSON.stringify({ name: "Admin Test", text: "Teste de ligação do painel CodeDesign Store!" }),
      });
      setSaveMessage(res.ok ? "Teste enviado!" : "Erro no teste");
    } catch (error) {
      setSaveMessage("Erro de ligação.");
    }
    setTimeout(() => setSaveMessage(""), 5000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <div className="text-neutral-500 text-sm">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1">Configurações</h2>
          <p className="text-sm text-neutral-500">Gerir definições do site e integrações</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary text-sm flex items-center gap-2">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>

      {saveMessage && (
        <div className="flex items-center gap-2 p-3 bg-green-500/5 border border-green-500/20 rounded-lg text-green-400 text-sm">
          <Check className="w-4 h-4" />
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-500" />
            Dados do Site
          </h3>
          <input type="text" placeholder="Nome do Site" value={storeName} onChange={e => setStoreName(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Morada" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <button type="submit" className="btn-primary text-sm w-full justify-center">
            <Save className="w-3.5 h-3.5" />
            Guardar
          </button>
        </form>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-neutral-500" />
            Telegram Bot
          </h3>
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-xs text-neutral-400 space-y-1">
            <p><strong className="text-cyan-400">1.</strong> Crie um bot com @BotFather</p>
            <p><strong className="text-cyan-400">2.</strong> Obtenha o Chat ID com @userinfobot</p>
            <p><strong className="text-cyan-400">3.</strong> Cole abaixo e teste</p>
          </div>
          <input type="password" placeholder="Bot Token" value={socials.telegramToken} onChange={e => setSocials({...socials, telegramToken: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Chat ID" value={socials.telegramChatId} onChange={e => setSocials({...socials, telegramChatId: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <button type="button" onClick={handleTestTelegram} className="btn-secondary text-sm w-full justify-center">
            <TestTube className="w-3.5 h-3.5" />
            Testar Ligação
          </button>
        </div>

        <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <Link2 className="w-4 h-4 text-neutral-500" />
            Redes Sociais
          </h3>
          <input type="text" placeholder="Instagram URL" value={socials.instagram} onChange={e => setSocials({...socials, instagram: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Facebook URL" value={socials.facebook} onChange={e => setSocials({...socials, facebook: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="LinkedIn URL" value={socials.linkedin} onChange={e => setSocials({...socials, linkedin: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="GitHub URL" value={socials.github} onChange={e => setSocials({...socials, github: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <button type="submit" className="btn-primary text-sm w-full justify-center">
            <Save className="w-3.5 h-3.5" />
            Guardar Redes
          </button>
        </form>
      </div>
    </div>
  );
}
