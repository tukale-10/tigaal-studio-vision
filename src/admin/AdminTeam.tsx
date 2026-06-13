import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ImageUpload from "./components/ImageUpload";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  category: string;
}

const empty: Omit<TeamMember, "id"> = {
  name: "", title: "", bio: "", image_url: null, display_order: 0,
  published: true, linkedin_url: null, twitter_url: null, email: null, category: "core",
};

const AdminTeam = () => {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order");
    setItems((data as TeamMember[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty, display_order: items.length }); setCreating(true); };
  const openEdit = (item: TeamMember) => { setCreating(false); setEditing(item); setForm({ name: item.name, title: item.title, bio: item.bio, image_url: item.image_url, display_order: item.display_order, published: item.published, linkedin_url: item.linkedin_url, twitter_url: item.twitter_url, email: item.email, category: item.category || "core" }); };

  const save = async () => {
    if (editing) await supabase.from("team_members").update(form).eq("id", editing.id);
    else await supabase.from("team_members").insert(form);
    setEditing(null); setCreating(false); load();
  };

  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("team_members").delete().eq("id", id); load(); } };
  const togglePublish = async (item: TeamMember) => { await supabase.from("team_members").update({ published: !item.published }).eq("id", item.id); load(); };

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-slate-900">{editing ? "Edit Member" : "New Member"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-slate-500 hover:text-slate-900 text-sm">Cancel</button>
        </div>
        <div className="max-w-2xl space-y-6">
          <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Title / Role" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-slate-600 text-sm mb-2">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={5} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-2">Photo</label>
            <ImageUpload value={form.image_url || undefined} onChange={(url) => setForm({ ...form, image_url: url })} />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-2">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))]">
              <option value="core">Core Team</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <Field label="LinkedIn URL" value={form.linkedin_url || ""} onChange={(v) => setForm({ ...form, linkedin_url: v || null })} />
          <Field label="Email" value={form.email || ""} onChange={(v) => setForm({ ...form, email: v || null })} />
          <label className="flex items-center gap-2 text-slate-600 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" /> Published
          </label>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90">Save Member</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-slate-900">Team Members</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90"><Plus size={16} /> Add Member</button>
      </div>
      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />)}</div>
      : items.length === 0 ? <div className="text-center py-20 text-slate-400">No team members yet.</div>
      : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-slate-200 rounded-lg p-4 hover:border-slate-200 transition-colors">
              {item.image_url ? <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded-full flex-shrink-0" /> : <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-medium truncate">{item.name}</h3>
                <p className="text-slate-500 text-sm truncate">{item.title}</p>
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

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div><label className="block text-slate-600 text-sm mb-2">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 focus:outline-none focus:border-[hsl(var(--accent))]" /></div>
);

export default AdminTeam;
