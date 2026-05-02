"use client";

import React, { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-fetch";
import { Plus, Trash2, FileText, Calendar, Eye, ChevronRight } from "lucide-react";

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

  if (loading) return <div className="text-neutral-500 text-sm">A carregar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1">Blog</h2>
          <p className="text-sm text-neutral-500">Gerir artigos e publicações</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          <Plus className="w-3.5 h-3.5" />
          Novo Artigo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-4">
          <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Resumo" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <textarea placeholder="Conteúdo" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required rows={8} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none resize-none placeholder:text-neutral-600" />
          <input type="text" placeholder="Tags (separadas por vírgula)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neutral-600 focus:outline-none placeholder:text-neutral-600" />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary text-sm">Publicar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancelar</button>
          </div>
        </form>
      )}

      <div className="space-y-px bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="bg-black p-5 flex items-start justify-between gap-4 group hover:bg-neutral-950 transition-colors">
            <div className="flex-1">
              <h3 className="text-sm font-display font-semibold text-white mb-1">{post.title}</h3>
              <p className="text-xs text-neutral-500 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString("pt-PT")}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.views || 0}
                </span>
              </div>
            </div>
            <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-8 h-8 text-neutral-800 mx-auto mb-3" />
            <p className="text-sm text-neutral-600">Nenhum artigo publicado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
