import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Search, Plus, X, Trash2, AlertCircle, LayoutGrid, Table as TableIcon,
  List as ListIcon, Check
} from "lucide-react";

const STATUSES = [
  { key: "pipeline",     label: "Pipeline / Tenders", color: "#A5A8E8", soft: "rgba(165,168,232,0.14)" },
  { key: "proposal",     label: "Proposal Submitted", color: "#F0B95A", soft: "rgba(240,185,90,0.14)" },
  { key: "did_not_land", label: "Did Not Land",       color: "#E47A6E", soft: "rgba(228,122,110,0.14)" },
  { key: "active",       label: "Active",             color: "#5EA8D6", soft: "rgba(94,168,214,0.14)" },
  { key: "closing",      label: "Closing / Handover", color: "#A8DB5E", soft: "rgba(168,219,94,0.14)" },
  { key: "completed",    label: "Completed",          color: "#9CC0AE", soft: "rgba(156,192,174,0.14)" },
] as const;
type StatusKey = typeof STATUSES[number]["key"];
const STATUS_MAP: Record<string, typeof STATUSES[number]> = Object.fromEntries(
  STATUSES.map(s => [s.key, s])
) as any;

type ChecklistItem = { text: string; done: boolean };
interface PipelineProject {
  id: string;
  name: string;
  funder: string | null;
  status: StatusKey;
  lead: string | null;
  timeline: string | null;
  contacts: string | null;
  description: string | null;
  tags: string[];
  checklist: ChecklistItem[];
}

const emptyDraft = (): PipelineProject => ({
  id: "",
  name: "",
  funder: "",
  status: "pipeline",
  lead: "",
  timeline: "",
  contacts: "",
  description: "",
  tags: [],
  checklist: [],
});

const initials = (name?: string | null) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
};

const AdminPipeline = () => {
  const [projects, setProjects] = useState<PipelineProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"board" | "table" | "list">("board");
  const [search, setSearch] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fFunder, setFFunder] = useState("");
  const [fLead, setFLead] = useState("");
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState(1);
  const [drawer, setDrawer] = useState<PipelineProject | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("pipeline_projects")
      .select("*")
      .order("updated_at", { ascending: false });
    setProjects(((data as any[]) || []).map(p => ({
      ...p,
      tags: p.tags || [],
      checklist: Array.isArray(p.checklist) ? p.checklist : [],
    })));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ESC closes drawer
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawer(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(p => {
      if (fStatus && p.status !== fStatus) return false;
      if (fFunder && p.funder !== fFunder) return false;
      if (fLead && p.lead !== fLead) return false;
      if (q) {
        const hay = [p.name, p.funder, p.lead, p.description, (p.tags || []).join(" ")]
          .filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, search, fStatus, fFunder, fLead]);

  const funderOptions = useMemo(
    () => [...new Set(projects.map(p => p.funder).filter(Boolean) as string[])].sort(),
    [projects]
  );
  const leadOptions = useMemo(
    () => [...new Set(projects.map(p => p.lead).filter(Boolean) as string[])].sort(),
    [projects]
  );

  const openNew = () => {
    setIsNew(true);
    setDrawer(emptyDraft());
    setSavedAt(null);
  };
  const openEdit = (p: PipelineProject) => {
    setIsNew(false);
    setDrawer({ ...p, tags: [...p.tags], checklist: p.checklist.map(c => ({ ...c })) });
    setSavedAt(null);
  };

  const save = async () => {
    if (!drawer) return;
    setSaving(true);
    const payload = {
      name: drawer.name.trim() || "Untitled project",
      funder: drawer.funder?.trim() || null,
      status: drawer.status,
      lead: drawer.lead?.trim() || null,
      timeline: drawer.timeline?.trim() || null,
      contacts: drawer.contacts?.trim() || null,
      description: drawer.description?.trim() || null,
      tags: drawer.tags,
      checklist: drawer.checklist,
    };
    if (isNew) {
      const { data } = await supabase.from("pipeline_projects").insert(payload).select().single();
      if (data) {
        setDrawer({ ...(data as any), tags: data.tags || [], checklist: data.checklist || [] });
        setIsNew(false);
      }
    } else {
      await supabase.from("pipeline_projects").update(payload).eq("id", drawer.id);
    }
    await load();
    setSavedAt(new Date().toLocaleTimeString());
    setSaving(false);
    setTimeout(() => setSavedAt(null), 3000);
  };

  const remove = async () => {
    if (!drawer || isNew) { setDrawer(null); return; }
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await supabase.from("pipeline_projects").delete().eq("id", drawer.id);
    setDrawer(null);
    load();
  };

  const clearFilters = () => {
    setSearch(""); setFStatus(""); setFFunder(""); setFLead("");
  };

  const sortedTable = useMemo(() => {
    const rows = [...filtered];
    if (sortCol) {
      rows.sort((a: any, b: any) => {
        let av: any = (a[sortCol] || "").toString().toLowerCase();
        let bv: any = (b[sortCol] || "").toString().toLowerCase();
        if (sortCol === "status") {
          av = STATUSES.findIndex(s => s.key === a.status);
          bv = STATUSES.findIndex(s => s.key === b.status);
        }
        if (av < bv) return -1 * sortDir;
        if (av > bv) return 1 * sortDir;
        return 0;
      });
    }
    return rows;
  }, [filtered, sortCol, sortDir]);

  const sortBy = (col: string) => {
    if (sortCol === col) setSortDir(d => -d);
    else { setSortCol(col); setSortDir(1); }
  };

  return (
    <div className="text-white">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Management</h1>
          <p className="text-white/40 text-sm mt-1">Track every tender, proposal, active engagement and closure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0f172a] border border-white/10 rounded-lg p-1 gap-1">
            {([
              { k: "board", icon: LayoutGrid, label: "Board" },
              { k: "table", icon: TableIcon, label: "Table" },
              { k: "list",  icon: ListIcon,  label: "List" },
            ] as const).map(v => (
              <button
                key={v.k}
                onClick={() => setView(v.k)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  view === v.k
                    ? "bg-[#8DC63F] text-[#0D3650]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <v.icon size={14} /> {v.label}
              </button>
            ))}
          </div>
          <button
            onClick={openNew}
            className="bg-[#8DC63F] text-[#0D3650] font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 hover:brightness-110"
          >
            <Plus size={16} /> New project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0f172a] border border-white/5 rounded-lg p-3 mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, clients, leads, tags…"
            className="w-full bg-[#0c1222] border border-white/10 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8DC63F]"
          />
        </div>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="bg-[#0c1222] border border-white/10 rounded-md px-3 py-2 text-sm text-white">
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <select value={fFunder} onChange={(e) => setFFunder(e.target.value)} className="bg-[#0c1222] border border-white/10 rounded-md px-3 py-2 text-sm text-white max-w-[200px]">
          <option value="">All funders</option>
          {funderOptions.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={fLead} onChange={(e) => setFLead(e.target.value)} className="bg-[#0c1222] border border-white/10 rounded-md px-3 py-2 text-sm text-white">
          <option value="">All leads</option>
          {leadOptions.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button onClick={clearFilters} className="text-xs text-[#8DC63F] hover:underline font-semibold">Clear filters</button>
        <span className="ml-auto text-xs text-white/40 font-mono">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-white/40">Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-[#0f172a] border border-white/5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-white/40 text-sm mb-4">Add your first tender or project to begin tracking.</p>
          <button onClick={openNew} className="bg-[#8DC63F] text-[#0D3650] font-semibold px-4 py-2 rounded-lg text-sm">
            + New project
          </button>
        </div>
      ) : view === "board" ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map(s => {
            const items = filtered.filter(p => p.status === s.key);
            return (
              <div key={s.key} className="bg-[#0f172a] border border-white/5 rounded-lg min-w-[280px] flex-1 flex flex-col max-h-[calc(100vh-280px)]">
                <div className="p-3 border-b-2 flex items-center justify-between" style={{ borderBottomColor: s.color }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.label}</h3>
                  <span className="text-xs font-mono text-[#0c1222] font-bold px-1.5 py-0.5 rounded" style={{ background: s.color }}>{items.length}</span>
                </div>
                <div className="p-3 flex flex-col gap-2 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="text-xs text-white/30 text-center py-4">No projects</div>
                  ) : items.map(p => {
                    const open = (p.checklist || []).filter(c => !c.done).length;
                    return (
                      <button
                        key={p.id}
                        onClick={() => openEdit(p)}
                        className="bg-[#0c1222] border border-white/10 rounded-md p-3 text-left hover:border-[#8DC63F] hover:-translate-y-0.5 transition"
                      >
                        {p.funder && <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">{p.funder}</div>}
                        <h4 className="text-sm font-semibold leading-snug mb-2">{p.name}</h4>
                        {p.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {p.tags.slice(0, 4).map(t => (
                              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: s.soft, color: s.color }}>{t}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[11px] text-white/50 mt-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-5 h-5 rounded-full bg-[#134A6B] text-white text-[9px] font-bold flex items-center justify-center flex-none">{initials(p.lead)}</div>
                            <span className="truncate">{p.lead || "Unassigned"}</span>
                          </div>
                          {p.timeline && <span className="text-white/40 ml-2 flex-none">{p.timeline}</span>}
                        </div>
                        {open > 0 && (
                          <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#E5A93C]">
                            <AlertCircle size={10} /> {open} outstanding
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : view === "table" ? (
        <div className="bg-[#0f172a] border border-white/5 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 text-[11px] uppercase tracking-wider bg-[#0c1222]">
                {[
                  { k: "name", l: "Project" }, { k: "funder", l: "Funder/Client" },
                  { k: "status", l: "Status" }, { k: "lead", l: "Lead" }, { k: "timeline", l: "Timeline" },
                ].map(c => (
                  <th key={c.k} onClick={() => sortBy(c.k)} className="px-4 py-3 cursor-pointer hover:text-white">
                    {c.l} {sortCol === c.k && <span className="text-[#8DC63F]">{sortDir === 1 ? "▲" : "▼"}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTable.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-white/40">No projects match your filters.</td></tr>
              ) : sortedTable.map(p => {
                const s = STATUS_MAP[p.status];
                return (
                  <tr key={p.id} onClick={() => openEdit(p)} className="border-t border-white/5 hover:bg-white/5 cursor-pointer">
                    <td className="px-4 py-3 font-semibold">{p.name}</td>
                    <td className="px-4 py-3 text-white/60">{p.funder || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white" style={{ background: s.color }}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3 text-white/60">{p.lead || "Unassigned"}</td>
                    <td className="px-4 py-3 text-white/60">{p.timeline || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {STATUSES.map(s => {
            const items = filtered.filter(p => p.status === s.key);
            if (items.length === 0) return null;
            return (
              <div key={s.key} className="mb-6">
                <div className="flex items-center gap-3 pb-2 mb-3 border-b-2" style={{ borderBottomColor: s.color }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.label}</h3>
                  <span className="text-xs font-mono text-white px-1.5 py-0.5 rounded" style={{ background: s.color }}>{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map(p => (
                    <button key={p.id} onClick={() => openEdit(p)} className="w-full bg-[#0f172a] border border-white/5 rounded-lg p-4 flex items-center justify-between gap-4 hover:border-[#8DC63F] transition text-left">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm">{p.name}</h4>
                        <div className="text-xs text-white/40 mt-1">{p.funder || "—"}</div>
                      </div>
                      <div className="flex items-center gap-4 flex-none text-xs text-white/50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#134A6B] text-white text-[9px] font-bold flex items-center justify-center">{initials(p.lead)}</div>
                          {p.lead || "Unassigned"}
                        </div>
                        <span className="hidden md:inline">{p.timeline}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer */}
      {drawer && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setDrawer(null)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#0f172a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            <div className="bg-[#134A6B] p-5 flex justify-between items-start gap-3">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-[#BFD4E2] font-semibold mb-1">
                  {drawer.funder || "NEW PROJECT"}
                </div>
                <h2 className="text-lg font-bold leading-tight">{drawer.name || "New project"}</h2>
              </div>
              <button onClick={() => setDrawer(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-none">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <Field label="Project name">
                <input value={drawer.name} onChange={(e) => setDrawer({ ...drawer, name: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Funder / Client">
                  <input value={drawer.funder || ""} onChange={(e) => setDrawer({ ...drawer, funder: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Status">
                  <select value={drawer.status} onChange={(e) => setDrawer({ ...drawer, status: e.target.value as StatusKey })} className={inputCls}>
                    {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="TIGAAL Lead">
                  <input value={drawer.lead || ""} onChange={(e) => setDrawer({ ...drawer, lead: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Timeline">
                  <input placeholder="e.g. Jan 2025 – Jun 2026" value={drawer.timeline || ""} onChange={(e) => setDrawer({ ...drawer, timeline: e.target.value })} className={inputCls} />
                </Field>
              </div>
              <Field label="Key contacts">
                <input placeholder="e.g. John Opiyo (UNOPS PM)" value={drawer.contacts || ""} onChange={(e) => setDrawer({ ...drawer, contacts: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Description">
                <textarea rows={4} value={drawer.description || ""} onChange={(e) => setDrawer({ ...drawer, description: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Tags (comma separated)">
                <input
                  value={drawer.tags.join(", ")}
                  onChange={(e) => setDrawer({ ...drawer, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                  className={inputCls}
                  placeholder="e.g. M&E, World Bank, MIS"
                />
              </Field>

              <Field label="Outstanding items">
                <div className="space-y-2">
                  {drawer.checklist.length === 0 && (
                    <div className="text-xs text-white/30 py-1">No items yet — add tasks below.</div>
                  )}
                  {drawer.checklist.map((c, i) => (
                    <div key={i} className={`flex items-start gap-2 bg-[#0c1222] border border-white/10 rounded-md p-2 ${c.done ? "opacity-60" : ""}`}>
                      <button
                        onClick={() => {
                          const cl = [...drawer.checklist];
                          cl[i] = { ...cl[i], done: !cl[i].done };
                          setDrawer({ ...drawer, checklist: cl });
                        }}
                        className={`w-4 h-4 rounded border flex-none flex items-center justify-center mt-0.5 ${c.done ? "bg-[#8DC63F] border-[#8DC63F]" : "border-white/30"}`}
                      >
                        {c.done && <Check size={12} className="text-[#0D3650]" />}
                      </button>
                      <span className={`flex-1 text-sm ${c.done ? "line-through text-white/40" : ""}`}>{c.text}</span>
                      <button
                        onClick={() => setDrawer({ ...drawer, checklist: drawer.checklist.filter((_, j) => j !== i) })}
                        className="text-white/30 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newItem.trim()) {
                          setDrawer({ ...drawer, checklist: [...drawer.checklist, { text: newItem.trim(), done: false }] });
                          setNewItem("");
                        }
                      }}
                      placeholder="Add an item…"
                      className={inputCls}
                    />
                    <button
                      onClick={() => {
                        if (!newItem.trim()) return;
                        setDrawer({ ...drawer, checklist: [...drawer.checklist, { text: newItem.trim(), done: false }] });
                        setNewItem("");
                      }}
                      className="px-3 py-2 bg-[#134A6B] border border-white/10 rounded-md text-sm font-semibold hover:bg-[#0D3650]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Field>
            </div>

            {savedAt && (
              <div className="px-5 pb-1 text-[11px] text-[#8DC63F] font-mono">Saved {savedAt}</div>
            )}
            <div className="border-t border-white/10 p-4 flex gap-2 items-center">
              {!isNew && (
                <button onClick={remove} className="px-3 py-2.5 border border-white/10 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                  <Trash2 size={14} /> Delete
                </button>
              )}
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 bg-[#8DC63F] text-[#0D3650] font-bold py-2.5 rounded-lg text-sm hover:brightness-110 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const inputCls = "w-full bg-[#0c1222] border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8DC63F]";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1.5">{label}</label>
    {children}
  </div>
);

export default AdminPipeline;
