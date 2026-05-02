"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Users, Mail, Calendar, Search } from "lucide-react";

export default function AdminClientes() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const headers = await getAdminAuthHeaders();
      const res = await fetch("/api/contact", { headers });
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = contacts.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-gray-400">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-[var(--font-space)] font-bold">Clientes & Contactos</h2>
        <p className="text-gray-400">Gerir contactos e leads</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Pesquisar clientes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((contact) => (
          <div key={contact.id} className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
                {contact.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold">{contact.name}</h3>
                <p className="text-sm text-gray-400">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {contact.company && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {contact.company}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(contact.createdAt).toLocaleDateString("pt-PT")}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${contact.status === "new" ? "bg-yellow-400/20 text-yellow-400" : "bg-green-400/20 text-green-400"}`}>
                {contact.status === "new" ? "Novo" : "Contactado"}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Nenhum contacto recebido.</p>
          </div>
        )}
      </div>
    </div>
  );
}
