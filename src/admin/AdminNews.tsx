import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import RichEditor from "./components/RichEditor";
import type { Block } from "@blocknote/core";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: Block[];
  category: string;
  published_date: string;
  published: boolean;
}

const cats = ["Project Update", "Partnership", "Training", "Research", "Event", "Milestone", "Announcement"];

const empty: Omit<NewsItem, "id"> = {
  title: "", excerpt: "", content: [], category: "Update",
  published_date: new Date().toISOString().split("T")[0], published: false,
};

const AdminNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("news_updates").select("*").order("published_date", { ascending: false });
    setItems((data as unknown as NewsItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setCreating(true); };
  const openEdit = (item: NewsItem) => { setCreating(false); setEditing(item); setForm({ title: item.title, excerpt: item.excerpt, content: item.content || [], category: item.category, published_date: item.published_date, published: item.published }); };

  const save = async () => {
    const payload = { ...form, content: JSON.parse(JSON.stringify(form.content)) };
    if (editing) await supabase.from("news_updates").update(payload).eq("id", editing.id);
    else await supabase.from("news_updates").insert([payload]);
    setEditing(null); setCreating(false); load();
  };

  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("news_updates").delete().eq("id", id); load(); } };
  const togglePublish = async (item: NewsItem) => { await supabase.from("news_updates").update({ published: !item.published }).eq("id", item.id); load(); };

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-white">{editing ? "Edit Article" : "New Article"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white text-sm">Cancel</button>
        </div>
        <div className="max-w-3xl space-y-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-white/60 text-sm mb-2">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Content</label>
            <RichEditor value={form.content} onChange={(blocks) => setForm({ ...form, content: blocks })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))]">
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Published Date" value={form.published_date} onChange={(v) => setForm({ ...form, published_date: v })} type="date" />
          </div>
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" /> Published
          </label>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90">Save Article</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-white">News & Updates</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90"><Plus size={16} /> New Article</button>
      </div>
      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />)}</div>
      : items.length === 0 ? <div className="text-center py-20 text-white/30">No articles yet.</div>
      : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.category} · {item.published_date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(item)} className={`p-2 rounded-md ${item.published ? "text-emerald-400" : "text-white/20"}`}>{item.published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <button onClick={() => openEdit(item)} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => remove(item.id)} className="p-2 text-white/40 hover:text-red-400 rounded-md"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div><label className="block text-white/60 text-sm mb-2">{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))]" /></div>
);

export default AdminNews;
