import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff, Newspaper, FileText } from "lucide-react";
import RichEditor from "./components/RichEditor";
import type { Block } from "@blocknote/core";

type DispatchType = "news" | "dispatch";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: Block[];
  category: string;
  published_date: string;
  published: boolean;
  dispatch_type: DispatchType;
}

const newsCats = ["Project Update", "Partnership", "Training", "Event", "Milestone", "Announcement"];
const dispatchCats = ["Analysis", "Research", "Policy Brief", "Commentary", "Insight"];

const empty: Omit<NewsItem, "id"> = {
  title: "", excerpt: "", content: [], category: "Project Update",
  published_date: new Date().toISOString().split("T")[0], published: false,
  dispatch_type: "news",
};

const AdminNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | DispatchType>("all");

  const load = async () => {
    const { data } = await supabase.from("news_updates").select("*").order("published_date", { ascending: false });
    setItems((data as unknown as NewsItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setCreating(true); };
  const openEdit = (item: NewsItem) => {
    setCreating(false);
    setEditing(item);
    setForm({
      title: item.title, excerpt: item.excerpt, content: item.content || [],
      category: item.category, published_date: item.published_date, published: item.published,
      dispatch_type: item.dispatch_type || "news",
    });
  };

  const save = async () => {
    const payload = { ...form, content: JSON.parse(JSON.stringify(form.content)) };
    if (editing) await supabase.from("news_updates").update(payload).eq("id", editing.id);
    else await supabase.from("news_updates").insert([payload]);
    setEditing(null); setCreating(false); load();
  };

  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("news_updates").delete().eq("id", id); load(); } };
  const togglePublish = async (item: NewsItem) => { await supabase.from("news_updates").update({ published: !item.published }).eq("id", item.id); load(); };

  const visible = items.filter((i) => filter === "all" || (i.dispatch_type || "news") === filter);
  const cats = form.dispatch_type === "dispatch" ? dispatchCats : newsCats;

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-slate-900">{editing ? "Edit Article" : "New Article"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-slate-500 hover:text-slate-900 text-sm">Cancel</button>
        </div>
        <div className="max-w-3xl space-y-6">
          <div>
            <label className="block text-slate-600 text-sm mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, dispatch_type: "news", category: newsCats[0] })}
                className={`flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-colors ${
                  form.dispatch_type === "news"
                    ? "bg-[hsl(var(--accent))]/10 border-[hsl(var(--accent))] text-slate-900"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <Newspaper size={18} />
                <div>
                  <div className="font-medium text-sm">News & Update</div>
                  <div className="text-xs opacity-60">Project news, milestones, events</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, dispatch_type: "dispatch", category: dispatchCats[0] })}
                className={`flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-colors ${
                  form.dispatch_type === "dispatch"
                    ? "bg-[hsl(var(--accent))]/10 border-[hsl(var(--accent))] text-slate-900"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <FileText size={18} />
                <div>
                  <div className="font-medium text-sm">Analytical Dispatch</div>
                  <div className="text-xs opacity-60">Analysis, research, commentary</div>
                </div>
              </button>
            </div>
          </div>

          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-slate-600 text-sm mb-2">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-2">Content</label>
            <RichEditor value={form.content} onChange={(blocks) => setForm({ ...form, content: blocks })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 text-sm mb-2">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))]">
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Published Date" value={form.published_date} onChange={(v) => setForm({ ...form, published_date: v })} type="date" />
          </div>
          <label className="flex items-center gap-2 text-slate-600 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" /> Published
          </label>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90">Save Article</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-slate-900">News & Dispatches</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90"><Plus size={16} /> New Article</button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {([
          { key: "all", label: "All" },
          { key: "news", label: "News & Updates" },
          { key: "dispatch", label: "Analytical Dispatch" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-60">
              {tab.key === "all" ? items.length : items.filter((i) => (i.dispatch_type || "news") === tab.key).length}
            </span>
          </button>
        ))}
      </div>

      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />)}</div>
      : visible.length === 0 ? <div className="text-center py-20 text-slate-400">No articles yet.</div>
      : (
        <div className="space-y-2">
          {visible.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-slate-200 rounded-lg p-4 hover:border-slate-200 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                    (item.dispatch_type || "news") === "dispatch"
                      ? "bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {(item.dispatch_type || "news") === "dispatch" ? "Dispatch" : "News"}
                  </span>
                  <h3 className="text-slate-900 font-medium truncate">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-sm">{item.category} · {item.published_date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(item)} className={`p-2 rounded-md ${item.published ? "text-emerald-400" : "text-slate-900/20"}`}>{item.published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <button onClick={() => openEdit(item)} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => remove(item.id)} className="p-2 text-slate-500 hover:text-red-400 rounded-md"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div><label className="block text-slate-600 text-sm mb-2">{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))]" /></div>
);

export default AdminNews;
