import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  client: string | null;
  description: string;
  category: string;
  status: string;
  published: boolean;
}

const empty: Omit<Project, "id"> = {
  title: "", subtitle: "", client: "", description: "",
  category: "Research", status: "Completed", published: true,
};

const categories = ["Research", "M&E", "Communications", "Governance", "Climate", "Financial Inclusion"];
const statuses = ["Active", "Completed"];

const AdminProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setItems((data as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setCreating(true); };
  const openEdit = (item: Project) => { setCreating(false); setEditing(item); setForm({ title: item.title, subtitle: item.subtitle, client: item.client, description: item.description, category: item.category, status: item.status, published: item.published }); };

  const save = async () => {
    if (editing) await supabase.from("projects").update(form).eq("id", editing.id);
    else await supabase.from("projects").insert(form);
    setEditing(null); setCreating(false); load();
  };

  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("projects").delete().eq("id", id); load(); } };
  const togglePublish = async (item: Project) => { await supabase.from("projects").update({ published: !item.published }).eq("id", item.id); load(); };

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-white">{editing ? "Edit Project" : "New Project"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white text-sm">Cancel</button>
        </div>
        <div className="max-w-2xl space-y-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Subtitle" value={form.subtitle || ""} onChange={(v) => setForm({ ...form, subtitle: v })} />
          <Field label="Client" value={form.client || ""} onChange={(v) => setForm({ ...form, client: v })} />
          <div>
            <label className="block text-white/60 text-sm mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v })} />
            <Select label="Status" value={form.status} options={statuses} onChange={(v) => setForm({ ...form, status: v })} />
          </div>
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" /> Published
          </label>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90">Save Project</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-white">Projects</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90"><Plus size={16} /> Add Project</button>
      </div>
      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />)}</div>
      : items.length === 0 ? <div className="text-center py-20 text-white/30">No projects yet.</div>
      : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.client} · {item.category} · {item.status}</p>
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

const Select = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div><label className="block text-white/60 text-sm mb-2">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white/90 focus:outline-none focus:border-[hsl(var(--accent))]">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
);

export default AdminProjects;
