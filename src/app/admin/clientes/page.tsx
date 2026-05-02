"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Users, Mail, Calendar, Search, Check, ChevronRight } from "lucide-react";

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

  if (loading) return <div className="text-neutral-500 text-sm">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-bold text-white mb-1">Clientes & Contactos</h2>
        <p className="text-sm text-neutral-500">Gerir contactos e leads</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
        <input
          type="text"
          placeholder="Pesquisar clientes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600"
        />
      </div>

      <div className="space-y-px bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {filtered.map((contact) => (
          <div key={contact.id} className="bg-black p-4 flex items-center justify-between gap-4 group hover:bg-neutral-950 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium text-white">
                {contact.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{contact.name}</h3>
                <p className="text-xs text-neutral-500">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {contact.company && (
                <span className="text-xs text-neutral-600 hidden sm:block">{contact.company}</span>
              )}
              <span className="text-xs text-neutral-600 hidden sm:block">
                {new Date(contact.createdAt).toLocaleDateString("pt-PT")}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs ${contact.status === "new" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"}`}>
                {contact.status === "new" ? "Novo" : "Contactado"}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Mail className="w-8 h-8 text-neutral-800 mx-auto mb-3" />
            <p className="text-sm text-neutral-600">Nenhum contacto recebido.</p>
          </div>
        )}
      </div>
    </div>
  );
}
