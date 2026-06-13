import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import ImageUpload from "./components/ImageUpload";

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  image_url: string | null;
  highlights: string[];
  display_order: number;
  published: boolean;
}

const emptyService: Omit<Service, "id"> = {
  title: "", description: "", icon_name: "Briefcase", image_url: null,
  highlights: [], display_order: 0, published: true,
};

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyService);
  const [highlightInput, setHighlightInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.from("services").select("*").order("display_order");
    setItems((data as Service[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyService, display_order: items.length });
    setHighlightInput("");
    setCreating(true);
  };

  const openEdit = (item: Service) => {
    setCreating(false);
    setEditing(item);
    setForm({ title: item.title, description: item.description, icon_name: item.icon_name, image_url: item.image_url, highlights: item.highlights, display_order: item.display_order, published: item.published });
    setHighlightInput("");
  };

  const save = async () => {
    if (editing) {
      await supabase.from("services").update(form).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(form);
    }
    setEditing(null);
    setCreating(false);
    fetch();
  };

  const remove = async (id: string) => {
    if (confirm("Delete this service?")) {
      await supabase.from("services").delete().eq("id", id);
      fetch();
    }
  };

  const togglePublish = async (item: Service) => {
    await supabase.from("services").update({ published: !item.published }).eq("id", item.id);
    fetch();
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setForm({ ...form, highlights: [...form.highlights, highlightInput.trim()] });
      setHighlightInput("");
    }
  };

  const removeHighlight = (idx: number) => {
    setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== idx) });
  };

  const showForm = creating || editing;

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-slate-900">{editing ? "Edit Service" : "New Service"}</h1>
          <button onClick={() => { setEditing(null); setCreating(false); }} className="text-slate-500 hover:text-slate-900 text-sm">Cancel</button>
        </div>
        <div className="max-w-2xl space-y-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-slate-600 text-sm mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 placeholder:text-slate-900/20 focus:outline-none focus:border-[hsl(var(--accent))] resize-none" />
          </div>
          <Field label="Icon Name (Lucide)" value={form.icon_name} onChange={(v) => setForm({ ...form, icon_name: v })} />
          <div>
            <label className="block text-slate-600 text-sm mb-2">Image</label>
            <ImageUpload value={form.image_url || undefined} onChange={(url) => setForm({ ...form, image_url: url })} />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-2">Highlights</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.highlights.map((h, i) => (
                <span key={i} className="flex items-center gap-1 bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-md">
                  {h} <button type="button" onClick={() => removeHighlight(i)} className="text-slate-400 hover:text-red-400"><Trash2 size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())} className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 text-sm focus:outline-none focus:border-[hsl(var(--accent))]" placeholder="Add highlight..." />
              <button type="button" onClick={addHighlight} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-md text-sm hover:bg-white/15">Add</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-slate-600 text-sm cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" />
              Published
            </label>
          </div>
          <button onClick={save} className="px-6 py-2.5 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-semibold rounded-md hover:opacity-90 transition-opacity">Save Service</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-slate-900">Services</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Service
        </button>
      </div>
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No services yet. Click "Add Service" to create one.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] border border-slate-200 rounded-lg p-4 hover:border-slate-200 transition-colors">
              {item.image_url && <img src={item.image_url} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-medium truncate">{item.title}</h3>
                <p className="text-slate-500 text-sm truncate">{item.description.slice(0, 100)}...</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(item)} className={`p-2 rounded-md transition-colors ${item.published ? "text-emerald-400 hover:bg-emerald-500/10" : "text-slate-900/20 hover:bg-slate-100"}`} title={item.published ? "Published" : "Draft"}>
                  {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => openEdit(item)} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => remove(item.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-md"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-slate-600 text-sm mb-2">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-md text-slate-900/90 placeholder:text-slate-900/20 focus:outline-none focus:border-[hsl(var(--accent))]" />
  </div>
);

export default AdminServices;
