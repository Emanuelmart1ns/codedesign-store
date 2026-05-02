"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Plus, Trash2, FolderOpen, Tag, ChevronRight, Check } from "lucide-react";

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

  if (loading) return <div className="text-neutral-500 text-sm">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1">Projetos</h2>
          <p className="text-sm text-neutral-500">Gerir portfólio de projetos</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          <Plus className="w-3.5 h-3.5" />
          Novo Projeto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
            <input type="text" placeholder="Categoria" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          </div>
          <textarea placeholder="Descrição" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} required rows={3} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none resize-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Tags (separadas por vírgula)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Funcionalidades (separadas por vírgula)" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary text-sm">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancelar</button>
          </div>
        </form>
      )}

      <div className="space-y-px bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {projects.map((project) => (
          <div key={project.id} className="bg-black p-5 flex items-start justify-between gap-4 group hover:bg-neutral-950 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-display font-semibold text-white">{project.title}</h3>
                {project.category && (
                  <span className="px-2 py-0.5 bg-neutral-900 rounded text-xs text-neutral-500 font-mono">{project.category}</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mb-3">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-neutral-900 rounded text-xs text-neutral-600 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="p-12 text-center">
            <FolderOpen className="w-8 h-8 text-neutral-800 mx-auto mb-3" />
            <p className="text-sm text-neutral-600">Nenhum projeto adicionado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
