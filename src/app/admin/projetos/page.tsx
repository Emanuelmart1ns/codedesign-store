"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Plus, Edit, Trash2, ExternalLink, FolderOpen, Tag } from "lucide-react";

export default function AdminProjetos() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", desc: "", category: "", tags: "", features: "", image: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const headers = await getAdminAuthHeaders();
      const res = await fetch("/api/projects", { headers });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const headers = await getAdminAuthHeaders();
      await fetch("/api/projects", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()),
          features: formData.features.split(",").map(f => f.trim()),
        }),
      });
      setShowForm(false);
      setFormData({ title: "", desc: "", category: "", tags: "", features: "", image: "" });
      fetchProjects();
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Eliminar este projeto?")) return;
    try {
      const headers = await getAdminAuthHeaders();
      await fetch("/api/projects", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });
      fetchProjects();
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  if (loading) return <div className="text-gray-400">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-[var(--font-space)] font-bold">Projetos</h2>
          <p className="text-gray-400">Gerir portfólio de projetos</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
            <input type="text" placeholder="Categoria" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          </div>
          <textarea placeholder="Descrição" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none resize-none" />
          <input type="text" placeholder="Tags (separadas por vírgula)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Funcionalidades (separadas por vírgula)" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="glass-panel p-6 rounded-2xl hover:border-cyan-400/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <span className="text-xs text-cyan-400">{project.category}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-300 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Nenhum projeto adicionado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
