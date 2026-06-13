import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Search, X, LayoutGrid, Table as TableIcon,
  CheckSquare, Square, MapPin, Calendar, Users, DollarSign,
} from "lucide-react";
import ImageUpload from "./components/ImageUpload";

interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  client: string | null;
  description: string;
  category: string;
  status: string;
  published: boolean;
  cover_image: string | null;
  location: string | null;
  donor: string | null;
  partners: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: string | null;
  sector: string | null;
  tags: string[] | null;
  outcomes: string | null;
  gallery: string[] | null;
}

type FormState = Omit<Project, "id">;

const empty: FormState = {
  title: "", subtitle: "", client: "", description: "",
  category: "Research", status: "Active", published: true,
  cover_image: "", location: "", donor: "", partners: "",
  start_date: "", end_date: "", budget: "", sector: "",
  tags: [], outcomes: "", gallery: [],
};

const categories = ["Research", "M&E", "Communications", "Governance", "Climate", "Financial Inclusion"];
const statuses = ["Active", "Completed", "On Hold", "Cancelled"];

const statusTone: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-sky-50 text-sky-700 border-sky-200",
  "On Hold": "bg-amber-50 text-amber-700 border-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const AdminProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  // list UX
  const [view, setView] = useState<"grid" | "table">("grid");
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterPublished, setFilterPublished] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setItems((data as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let list = items.slice();
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) =>
      [p.title, p.subtitle, p.client, p.donor, p.location, p.sector, p.description, ...(p.tags || [])]
        .filter(Boolean).some((v) => (v as string).toLowerCase().includes(q))
    );
    if (filterCategory !== "All") list = list.filter((p) => p.category === filterCategory);
    if (filterStatus !== "All") list = list.filter((p) => p.status === filterStatus);
    if (filterPublished !== "all") list = list.filter((p) => p.published === (filterPublished === "published"));
    if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "oldest") list.reverse();
    return list;
  }, [items, query, filterCategory, filterStatus, filterPublished, sortBy]);

  const openCreate = () => { setEditing(null); setForm(empty); setCreating(true); };
  const openEdit = (item: Project) => {
    setCreating(false);
    setEditing(item);
    setForm({
      title: item.title, subtitle: item.subtitle || "", client: item.client || "",
      description: item.description || "", category: item.category, status: item.status,
      published: item.published, cover_image: item.cover_image || "", location: item.location || "",
      donor: item.donor || "", partners: item.partners || "",
      start_date: item.start_date || "", end_date: item.end_date || "",
      budget: item.budget || "", sector: item.sector || "",
      tags: item.tags || [], outcomes: item.outcomes || "", gallery: item.gallery || [],
    });
  };
  const closeDrawer = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    setSaving(true);
    const payload = {
      ...form,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };
    if (editing) await supabase.from("projects").update(payload).eq("id", editing.id);
    else await supabase.from("projects").insert(payload);
    setSaving(false);
    closeDrawer();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };
  const togglePublish = async (item: Project) => {
    await supabase.from("projects").update({ published: !item.published }).eq("id", item.id);
    load();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const allSelected = filtered.length > 0 && filtered.every((i) => selected.has(i.id));
  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((i) => i.id)));
  };
  const bulk = async (action: "publish" | "unpublish" | "delete") => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (action === "delete") {
      if (!confirm(`Delete ${ids.length} project(s)?`)) return;
      await supabase.from("projects").delete().in("id", ids);
    } else {
      await supabase.from("projects").update({ published: action === "publish" }).in("id", ids);
    }
    setSelected(new Set());
    load();
  };

  const isOpen = creating || !!editing;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} total · {items.filter((i) => i.published).length} published</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, client, donor, tags…"
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))]"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
          <option>All</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={filterPublished} onChange={(e) => setFilterPublished(e.target.value as any)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
          <option value="all">All visibility</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md overflow-hidden">
          <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`} title="Grid"><LayoutGrid size={15} /></button>
          <button onClick={() => setView("table")} className={`p-2 ${view === "table" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`} title="Table"><TableIcon size={15} /></button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-2 bg-slate-900 text-white rounded-md px-3 py-2 text-sm">
          <span className="font-medium">{selected.size} selected</span>
          <div className="flex-1" />
          <button onClick={() => bulk("publish")} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Publish</button>
          <button onClick={() => bulk("unpublish")} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Unpublish</button>
          <button onClick={() => bulk("delete")} className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600">Delete</button>
          <button onClick={() => setSelected(new Set())} className="px-2 py-1 rounded hover:bg-white/10"><X size={14} /></button>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-56 bg-slate-100 rounded-lg animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 border border-dashed border-slate-200 rounded-lg">
          {items.length === 0 ? "No projects yet. Create your first one." : "No projects match these filters."}
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onSelect={() => toggleSelect(item.id)}
              onEdit={() => openEdit(item)}
              onTogglePublish={() => togglePublish(item)}
              onDelete={() => remove(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-left">
              <tr>
                <th className="px-3 py-2 w-10">
                  <button onClick={toggleSelectAll}>{allSelected ? <CheckSquare size={15} /> : <Square size={15} />}</button>
                </th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Dates</th>
                <th className="px-3 py-2 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-3 py-2"><button onClick={() => toggleSelect(item.id)}>{selected.has(item.id) ? <CheckSquare size={15} /> : <Square size={15} />}</button></td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-slate-900">{item.title}</div>
                    {item.subtitle && <div className="text-xs text-slate-500">{item.subtitle}</div>}
                  </td>
                  <td className="px-3 py-2 text-slate-600">{item.client || "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{item.category}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${statusTone[item.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>{item.status}</span>
                  </td>
                  <td className="px-3 py-2 text-slate-600 text-xs">{fmtRange(item.start_date, item.end_date)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => togglePublish(item)} className={`p-1.5 rounded hover:bg-slate-100 ${item.published ? "text-emerald-600" : "text-slate-400"}`}>{item.published ? <Eye size={15} /> : <EyeOff size={15} />}</button>
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><Pencil size={15} /></button>
                      <button onClick={() => remove(item.id)} className="p-1.5 rounded hover:bg-rose-50 text-slate-500 hover:text-rose-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/30 z-40" onClick={closeDrawer} />
          <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display text-slate-900">{editing ? "Edit Project" : "New Project"}</h2>
                <p className="text-xs text-slate-500">{editing ? "Update project details" : "Add a new project"}</p>
              </div>
              <button onClick={closeDrawer} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <Section title="Basics">
                <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
                <Field label="Subtitle" value={form.subtitle || ""} onChange={(v) => setForm({ ...form, subtitle: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Category" value={form.category} options={categories} onChange={(v) => setForm({ ...form, category: v })} />
                  <Select label="Status" value={form.status} options={statuses} onChange={(v) => setForm({ ...form, status: v })} />
                </div>
                <Field label="Sector / Thematic Area" value={form.sector || ""} onChange={(v) => setForm({ ...form, sector: v })} />
              </Section>

              <Section title="Cover image">
                <ImageUpload value={form.cover_image || ""} onChange={(url) => setForm({ ...form, cover_image: url })} />
              </Section>

              <Section title="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={6}
                  placeholder="Project summary…"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))] resize-none"
                />
              </Section>

              <Section title="Client & Partners">
                <Field label="Client" value={form.client || ""} onChange={(v) => setForm({ ...form, client: v })} icon={<Users size={14} />} />
                <Field label="Donor / Funder" value={form.donor || ""} onChange={(v) => setForm({ ...form, donor: v })} icon={<DollarSign size={14} />} />
                <Field label="Partners (comma separated)" value={form.partners || ""} onChange={(v) => setForm({ ...form, partners: v })} />
                <Field label="Location" value={form.location || ""} onChange={(v) => setForm({ ...form, location: v })} icon={<MapPin size={14} />} />
              </Section>

              <Section title="Timeline & Budget">
                <div className="grid grid-cols-2 gap-3">
                  <DateField label="Start date" value={form.start_date || ""} onChange={(v) => setForm({ ...form, start_date: v })} />
                  <DateField label="End date" value={form.end_date || ""} onChange={(v) => setForm({ ...form, end_date: v })} />
                </div>
                <Field label="Budget" value={form.budget || ""} onChange={(v) => setForm({ ...form, budget: v })} placeholder="e.g. USD 120,000" />
              </Section>

              <Section title="Tags">
                <TagInput tags={form.tags || []} onChange={(tags) => setForm({ ...form, tags })} />
              </Section>

              <Section title="Outcomes & Impact">
                <textarea
                  value={form.outcomes || ""}
                  onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
                  rows={4}
                  placeholder="Key outcomes, deliverables, impact…"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))] resize-none"
                />
              </Section>

              <Section title="Visibility">
                <label className="flex items-center gap-2 text-slate-700 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[hsl(var(--accent))]" />
                  Published (visible on public site)
                </label>
              </Section>
            </div>
            <div className="border-t border-slate-200 px-6 py-3 flex items-center justify-end gap-2 bg-slate-50">
              <button onClick={closeDrawer} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">Cancel</button>
              <button onClick={save} disabled={saving || !form.title.trim()} className="px-5 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] text-sm font-semibold rounded-md hover:opacity-90 disabled:opacity-50">
                {saving ? "Saving…" : editing ? "Save changes" : "Create project"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const fmtRange = (s: string | null, e: string | null) => {
  if (!s && !e) return "—";
  const f = (d: string | null) => d ? new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "…";
  return `${f(s)} → ${f(e)}`;
};

const ProjectCard = ({ item, selected, onSelect, onEdit, onTogglePublish, onDelete }: {
  item: Project; selected: boolean; onSelect: () => void; onEdit: () => void; onTogglePublish: () => void; onDelete: () => void;
}) => (
  <div className={`group bg-white border rounded-lg overflow-hidden flex flex-col transition-all ${selected ? "border-[hsl(var(--accent))] ring-2 ring-[hsl(var(--accent))]/20" : "border-slate-200 hover:border-slate-300"}`}>
    <div className="relative aspect-[16/9] bg-slate-100">
      {item.cover_image ? (
        <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No cover image</div>
      )}
      <button onClick={onSelect} className="absolute top-2 left-2 p-1 bg-white/90 rounded shadow-sm">
        {selected ? <CheckSquare size={14} className="text-[hsl(var(--accent))]" /> : <Square size={14} className="text-slate-500" />}
      </button>
      <span className={`absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border ${statusTone[item.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>{item.status}</span>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-slate-900 line-clamp-2">{item.title}</h3>
      </div>
      {item.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.subtitle}</p>}
      <div className="mt-3 space-y-1.5 text-xs text-slate-600">
        {item.client && <div className="flex items-center gap-1.5"><Users size={12} className="text-slate-400" />{item.client}</div>}
        {item.location && <div className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-400" />{item.location}</div>}
        {(item.start_date || item.end_date) && <div className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-400" />{fmtRange(item.start_date, item.end_date)}</div>}
      </div>
      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">{t}</span>)}
          {item.tags.length > 3 && <span className="px-2 py-0.5 text-slate-400 text-[10px]">+{item.tags.length - 3}</span>}
        </div>
      )}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
        <span className="text-[11px] text-slate-400">{item.category}</span>
        <div className="flex items-center gap-1">
          <button onClick={onTogglePublish} className={`p-1.5 rounded hover:bg-slate-100 ${item.published ? "text-emerald-600" : "text-slate-400"}`} title={item.published ? "Published" : "Draft"}>{item.published ? <Eye size={14} /> : <EyeOff size={14} />}</button>
          <button onClick={onEdit} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><Pencil size={14} /></button>
          <button onClick={onDelete} className="p-1.5 rounded hover:bg-rose-50 text-slate-500 hover:text-rose-600"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{title}</div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, value, onChange, placeholder, icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; icon?: React.ReactNode }) => (
  <div>
    <label className="block text-slate-600 text-xs mb-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${icon ? "pl-9" : "pl-3"} pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))]`}
      />
    </div>
  </div>
);

const DateField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-slate-600 text-xs mb-1">{label}</label>
    <input type="date" value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))]" />
  </div>
);

const Select = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-slate-600 text-xs mb-1">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))]">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TagInput = ({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) => {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
            {t}
            <button onClick={() => onChange(tags.filter((x) => x !== t))} className="text-slate-400 hover:text-rose-500"><X size={11} /></button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-xs text-slate-400">No tags yet</span>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Add a tag and press Enter"
          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[hsl(var(--accent))]"
        />
        <button onClick={add} className="px-3 py-2 bg-slate-900 text-white text-sm rounded-md hover:bg-slate-800">Add</button>
      </div>
    </div>
  );
};

export default AdminProjects;
