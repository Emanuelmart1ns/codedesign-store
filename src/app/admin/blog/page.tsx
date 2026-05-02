"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Plus, Edit, Trash2, FileText, Calendar, Eye } from "lucide-react";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", excerpt: "", tags: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const headers = await getAdminAuthHeaders();
      const res = await fetch("/api/blog", { headers });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
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
      await fetch("/api/blog", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()),
        }),
      });
      setShowForm(false);
      setFormData({ title: "", content: "", excerpt: "", tags: "" });
      fetchPosts();
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Eliminar este artigo?")) return;
    try {
      const headers = await getAdminAuthHeaders();
      await fetch("/api/blog", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });
      fetchPosts();
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  if (loading) return <div className="text-gray-400">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-[var(--font-space)] font-bold">Blog</h2>
          <p className="text-gray-400">Gerir artigos e publicações</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Artigo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-4">
          <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <input type="text" placeholder="Resumo" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <textarea placeholder="Conteúdo" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required rows={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none resize-none" />
          <input type="text" placeholder="Tags (separadas por vírgula)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">Publicar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString("pt-PT")}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.views || 0} visualizações
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Nenhum artigo publicado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
