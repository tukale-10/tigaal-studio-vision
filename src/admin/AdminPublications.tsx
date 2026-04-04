import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import FileUpload from "./components/FileUpload";

interface Publication {
  id: string;
  title: string;
  description: string;
  pub_type: string;
  year: string;
  file_url: string | null;
  published: boolean;
}

const pubTypes = ["Policy Brief", "Research Paper", "Assessment Report", "Learning Brief", "Evaluation Report", "Strategy Paper"];

const empty: Omit<Publication, "id"> = {
  title: "", description: "", pub_type: "Report", year: "2026", file_url: null, published: false,
};

const AdminPublications = () => {
  const [items, setItems] = useState<Publication[]>([]);
  const [editing, setEditing] = useState<Publication | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("publications").select("*").order("year", { ascending: false });
    setItems((data as Publication[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setCreating(true); };
  const openEdit = (item: Publication) => { setCreating(false); setEditing(item); setForm({ title: item.title, description: item.description, pub_type: item.pub_type, year: item.year, file_url: item.file_url, published: item.published }); };

  const save = async () => {
    if (editing) await supabase.from("publications").update(form).eq("id", editing.id);
    else await supabase.from("publications").insert(form);
    setEditing(null); setCreating(false); load();
  };

  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("publications").delete().eq("id", id); load(); } };
  const togglePublish = async (item: Publication) => { await supabase.from("publications").update({ published: !item.published }).eq("id", item.id); load(); };

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-white">{editing ? "Edit Publication" : "New Publication"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white text-sm">Cancel</button>
        </div>
        <div className="max-w-2xl space-y-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-white/60 text-sm mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Type</label>
              <select value={form.pub_type} onChange={(e) => setForm({ ...form, pub_type: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))]">
                {pubTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Field label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Document File</label>
            <FileUpload value={form.file_url || undefined} onChange={(url) => setForm({ ...form, file_url: url })} />
          </div>
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" /> Published
          </label>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90">Save Publication</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-white">Publications</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90"><Plus size={16} /> Add Publication</button>
      </div>
      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />)}</div>
      : items.length === 0 ? <div className="text-center py-20 text-white/30">No publications yet.</div>
      : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.pub_type} · {item.year}</p>
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

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div><label className="block text-white/60 text-sm mb-2">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))]" /></div>
);

export default AdminPublications;
