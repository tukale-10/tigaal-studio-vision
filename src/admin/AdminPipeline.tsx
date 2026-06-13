import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Search, Plus, X, Trash2, AlertCircle, LayoutGrid, Table as TableIcon,
  List as ListIcon, Check, CalendarClock
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

const STAGES = [
  { key: "prequalification", label: "Prequalification" },
  { key: "proposal_drafted", label: "Proposal Drafted" },
  { key: "submitted",        label: "Submitted" },
  { key: "awarded",          label: "Awarded" },
] as const;
type StageKey = typeof STAGES[number]["key"];
type StageFlags = Record<StageKey, boolean>;

type ChecklistItem = { text: string; done: boolean };
interface PipelineProject {
  id: string;
  opportunity_no: number | null;
  name: string;
  funder: string | null;
  sector: string | null;
  status: StatusKey;
  lead: string | null;
  submission_deadline: string | null;
  timeline: string | null;
  contacts: string | null;
  description: string | null;
  key_tasks: string | null;
  progress_remarks: string | null;
  followup_actions: string | null;
  tags: string[];
  checklist: ChecklistItem[];
  stage_flags: StageFlags;
}

const emptyFlags = (): StageFlags => ({
  prequalification: false, proposal_drafted: false, submitted: false, awarded: false,
});

const emptyDraft = (): PipelineProject => ({
  id: "",
  opportunity_no: null,
  name: "",
  funder: "",
  sector: "",
  status: "pipeline",
  lead: "",
  submission_deadline: "",
  timeline: "",
  contacts: "",
  description: "",
  key_tasks: "",
  progress_remarks: "",
  followup_actions: "",
  tags: [],
  checklist: [],
  stage_flags: emptyFlags(),
});

const initials = (name?: string | null) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
};

const daysUntil = (iso?: string | null): number | null => {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
};

const deadlineTone = (days: number | null) => {
  if (days === null) return { bg: "rgba(255,255,255,0.06)", fg: "rgba(255,255,255,0.55)", label: "No deadline" };
  if (days < 0)  return { bg: "rgba(228,122,110,0.18)", fg: "#E47A6E", label: `${Math.abs(days)}d overdue` };
  if (days <= 7) return { bg: "rgba(228,122,110,0.18)", fg: "#E47A6E", label: `${days}d left` };
  if (days <= 30) return { bg: "rgba(240,185,90,0.18)", fg: "#F0B95A", label: `${days}d left` };
  return { bg: "rgba(168,219,94,0.15)", fg: "#A8DB5E", label: `${days}d left` };
};

const progressPct = (flags?: StageFlags | null) => {
  if (!flags) return 0;
  const done = STAGES.filter(s => flags[s.key]).length;
  return Math.round((done / STAGES.length) * 100);
};

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
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
      .order("opportunity_no", { ascending: true, nullsFirst: false })
      .order("updated_at", { ascending: false });
    setProjects(((data as any[]) || []).map(p => ({
      ...p,
      tags: p.tags || [],
      checklist: Array.isArray(p.checklist) ? p.checklist : [],
      stage_flags: { ...emptyFlags(), ...(p.stage_flags || {}) },
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
        const hay = [p.name, p.funder, p.sector, p.lead, p.description, p.key_tasks, p.progress_remarks, (p.tags || []).join(" ")]
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
    setDrawer({
      ...p,
      tags: [...p.tags],
      checklist: p.checklist.map(c => ({ ...c })),
      stage_flags: { ...emptyFlags(), ...(p.stage_flags || {}) },
    });
    setSavedAt(null);
  };

  const save = async () => {
    if (!drawer) return;
    setSaving(true);
    const payload: any = {
      opportunity_no: drawer.opportunity_no,
      name: drawer.name.trim() || "Untitled project",
      funder: drawer.funder?.trim() || null,
      sector: drawer.sector?.trim() || null,
      status: drawer.status,
      lead: drawer.lead?.trim() || null,
      submission_deadline: drawer.submission_deadline || null,
      timeline: drawer.timeline?.trim() || null,
      contacts: drawer.contacts?.trim() || null,
      description: drawer.description?.trim() || null,
      key_tasks: drawer.key_tasks?.trim() || null,
      progress_remarks: drawer.progress_remarks?.trim() || null,
      followup_actions: drawer.followup_actions?.trim() || null,
      tags: drawer.tags,
      checklist: drawer.checklist,
      stage_flags: drawer.stage_flags,
    };
    if (isNew) {
      const { data } = await supabase.from("pipeline_projects").insert(payload).select().single();
      if (data) {
        setDrawer({
          ...(data as any),
          tags: data.tags || [],
          checklist: (data as any).checklist || [],
          stage_flags: { ...emptyFlags(), ...((data as any).stage_flags || {}) },
        });
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
    <div className="text-slate-900">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track every tender, proposal, active engagement and closure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 gap-1">
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
                    ? "bg-[#8DC63F] text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <v.icon size={14} /> {v.label}
              </button>
            ))}
          </div>
          <button
            onClick={openNew}
            className="bg-[#8DC63F] text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 hover:brightness-110"
          >
            <Plus size={16} /> New project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, clients, leads, tags…"
            className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8DC63F]"
          />
        </div>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900">
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <select value={fFunder} onChange={(e) => setFFunder(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 max-w-[200px]">
          <option value="">All funders</option>
          {funderOptions.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={fLead} onChange={(e) => setFLead(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900">
          <option value="">All leads</option>
          {leadOptions.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button onClick={clearFilters} className="text-xs text-[#8DC63F] hover:underline font-semibold">Clear filters</button>
        <span className="ml-auto text-xs text-slate-500 font-mono">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading projects…</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-slate-500 text-sm mb-4">Add your first tender or project to begin tracking.</p>
          <button onClick={openNew} className="bg-[#8DC63F] text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm">
            + New project
          </button>
        </div>
      ) : view === "board" ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map(s => {
            const items = filtered.filter(p => p.status === s.key);
            return (
              <div key={s.key} className="bg-white border border-slate-200 rounded-lg min-w-[280px] flex-1 flex flex-col max-h-[calc(100vh-280px)]">
                <div className="p-3 border-b-2 flex items-center justify-between" style={{ borderBottomColor: s.color }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.label}</h3>
                  <span className="text-xs font-mono text-[#0c1222] font-bold px-1.5 py-0.5 rounded" style={{ background: s.color }}>{items.length}</span>
                </div>
                <div className="p-3 flex flex-col gap-2 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-4">No projects</div>
                  ) : items.map(p => {
                    const open = (p.checklist || []).filter(c => !c.done).length;
                    const days = daysUntil(p.submission_deadline);
                    const tone = deadlineTone(days);
                    const pct = progressPct(p.stage_flags);
                    return (
                      <button
                        key={p.id}
                        onClick={() => openEdit(p)}
                        className="bg-slate-50 border border-slate-200 rounded-md p-3 text-left hover:border-[#8DC63F] hover:-translate-y-0.5 transition"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          {(p.funder || p.sector) && (
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold truncate">
                              {p.funder || p.sector}
                            </div>
                          )}
                          {p.opportunity_no != null && (
                            <span className="text-[9px] font-mono text-slate-400 flex-none">#{p.opportunity_no}</span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold leading-snug mb-2">{p.name}</h4>
                        {p.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {p.tags.slice(0, 4).map(t => (
                              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: s.soft, color: s.color }}>{t}</span>
                            ))}
                          </div>
                        )}
                        {p.submission_deadline && (
                          <div className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded mb-2" style={{ background: tone.bg, color: tone.fg }}>
                            <CalendarClock size={10} /> {formatDate(p.submission_deadline)} · {tone.label}
                          </div>
                        )}
                        <div className="mt-1.5">
                          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                            <span>Progress</span><span>{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-5 h-5 rounded-full bg-slate-900 text-slate-900 text-[9px] font-bold flex items-center justify-center flex-none">{initials(p.lead)}</div>
                            <span className="truncate">{p.lead || "Unassigned"}</span>
                          </div>
                          {p.timeline && <span className="text-slate-500 ml-2 flex-none">{p.timeline}</span>}
                        </div>
                        {open > 0 && (
                          <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#F0B95A]">
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
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="text-left text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50">
                {[
                  { k: "opportunity_no", l: "#" },
                  { k: "name", l: "Opportunity" },
                  { k: "sector", l: "Sector" },
                  { k: "submission_deadline", l: "Deadline" },
                  { k: "status", l: "Stage" },
                  { k: "lead", l: "Focal" },
                  { k: "progress", l: "Progress" },
                ].map(c => (
                  <th key={c.k} onClick={() => sortBy(c.k)} className="px-4 py-3 cursor-pointer hover:text-slate-900 whitespace-nowrap">
                    {c.l} {sortCol === c.k && <span className="text-[#8DC63F]">{sortDir === 1 ? "▲" : "▼"}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTable.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-slate-500">No projects match your filters.</td></tr>
              ) : sortedTable.map(p => {
                const s = STATUS_MAP[p.status];
                const days = daysUntil(p.submission_deadline);
                const tone = deadlineTone(days);
                const pct = progressPct(p.stage_flags);
                return (
                  <tr key={p.id} onClick={() => openEdit(p)} className="border-t border-slate-200 hover:bg-slate-100 cursor-pointer">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.opportunity_no ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold max-w-[340px]">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{p.sector || "—"}</td>
                    <td className="px-4 py-3 text-xs">
                      {p.submission_deadline ? (
                        <span className="inline-flex items-center gap-1 font-bold px-1.5 py-0.5 rounded" style={{ background: tone.bg, color: tone.fg }}>
                          {formatDate(p.submission_deadline)} · {tone.label}
                        </span>
                      ) : <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: s.color, color: "#0c1222" }}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{p.lead || "Unassigned"}</td>
                    <td className="px-4 py-3 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{pct}%</span>
                      </div>
                    </td>
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
                  <span className="text-xs font-mono text-[#0c1222] font-bold px-1.5 py-0.5 rounded" style={{ background: s.color }}>{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map(p => (
                    <button key={p.id} onClick={() => openEdit(p)} className="w-full bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between gap-4 hover:border-[#8DC63F] transition text-left">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm">{p.name}</h4>
                        <div className="text-xs text-slate-500 mt-1">{p.funder || "—"}</div>
                      </div>
                      <div className="flex items-center gap-4 flex-none text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-slate-900 text-slate-900 text-[9px] font-bold flex items-center justify-center">{initials(p.lead)}</div>
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
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white border-l border-slate-200 z-50 flex flex-col shadow-2xl">
            <div className="bg-slate-900 p-5 flex justify-between items-start gap-3">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  {drawer.funder || "NEW PROJECT"}
                </div>
                <h2 className="text-lg font-bold leading-tight">{drawer.name || "New project"}</h2>
              </div>
              <button onClick={() => setDrawer(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-none">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-[80px_1fr] gap-3">
                <Field label="S/no">
                  <input
                    type="number"
                    value={drawer.opportunity_no ?? ""}
                    onChange={(e) => setDrawer({ ...drawer, opportunity_no: e.target.value ? parseInt(e.target.value, 10) : null })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Opportunity title">
                  <input value={drawer.name} onChange={(e) => setDrawer({ ...drawer, name: e.target.value })} className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Funder / Client">
                  <input value={drawer.funder || ""} onChange={(e) => setDrawer({ ...drawer, funder: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Sector / Thematic Area">
                  <input value={drawer.sector || ""} onChange={(e) => setDrawer({ ...drawer, sector: e.target.value })} className={inputCls} placeholder="e.g. Gender & Women's Empowerment" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Submission deadline">
                  <input
                    type="date"
                    value={drawer.submission_deadline || ""}
                    onChange={(e) => setDrawer({ ...drawer, submission_deadline: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Current stage">
                  <select value={drawer.status} onChange={(e) => setDrawer({ ...drawer, status: e.target.value as StatusKey })} className={inputCls}>
                    {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Focal person">
                  <input value={drawer.lead || ""} onChange={(e) => setDrawer({ ...drawer, lead: e.target.value })} className={inputCls} placeholder="e.g. Mohamed" />
                </Field>
                <Field label="Timeline">
                  <input placeholder="e.g. Jan 2025 – Jun 2026" value={drawer.timeline || ""} onChange={(e) => setDrawer({ ...drawer, timeline: e.target.value })} className={inputCls} />
                </Field>
              </div>

              <Field label="Stage progress">
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    <span>Pipeline → Award</span>
                    <span className="text-[#A8DB5E]">{progressPct(drawer.stage_flags)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progressPct(drawer.stage_flags)}%`, background: STATUS_MAP[drawer.status]?.color || "#A8DB5E" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {STAGES.map(st => {
                      const on = drawer.stage_flags[st.key];
                      return (
                        <button
                          key={st.key}
                          onClick={() => setDrawer({ ...drawer, stage_flags: { ...drawer.stage_flags, [st.key]: !on } })}
                          className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded border transition ${on ? "bg-[#A8DB5E]/15 border-[#A8DB5E]/40 text-[#A8DB5E]" : "border-slate-200 text-slate-500 hover:border-slate-400"}`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-sm border flex-none flex items-center justify-center ${on ? "bg-[#A8DB5E] border-[#A8DB5E]" : "border-slate-400"}`}>
                            {on && <Check size={10} className="text-[#0c1222]" />}
                          </span>
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Field>

              <Field label="Key tasks & deliverables">
                <textarea rows={3} value={drawer.key_tasks || ""} onChange={(e) => setDrawer({ ...drawer, key_tasks: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Progress & remarks">
                <textarea rows={3} value={drawer.progress_remarks || ""} onChange={(e) => setDrawer({ ...drawer, progress_remarks: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Follow-up actions & timeline">
                <textarea rows={3} value={drawer.followup_actions || ""} onChange={(e) => setDrawer({ ...drawer, followup_actions: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Key contacts">
                <input placeholder="e.g. John Opiyo (UNOPS PM)" value={drawer.contacts || ""} onChange={(e) => setDrawer({ ...drawer, contacts: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Notes / Description">
                <textarea rows={3} value={drawer.description || ""} onChange={(e) => setDrawer({ ...drawer, description: e.target.value })} className={inputCls} />
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
                    <div className="text-xs text-slate-400 py-1">No items yet — add tasks below.</div>
                  )}
                  {drawer.checklist.map((c, i) => (
                    <div key={i} className={`flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-md p-2 ${c.done ? "opacity-60" : ""}`}>
                      <button
                        onClick={() => {
                          const cl = [...drawer.checklist];
                          cl[i] = { ...cl[i], done: !cl[i].done };
                          setDrawer({ ...drawer, checklist: cl });
                        }}
                        className={`w-4 h-4 rounded border flex-none flex items-center justify-center mt-0.5 ${c.done ? "bg-[#8DC63F] border-[#8DC63F]" : "border-slate-400"}`}
                      >
                        {c.done && <Check size={12} className="text-slate-900" />}
                      </button>
                      <span className={`flex-1 text-sm ${c.done ? "line-through text-slate-500" : ""}`}>{c.text}</span>
                      <button
                        onClick={() => setDrawer({ ...drawer, checklist: drawer.checklist.filter((_, j) => j !== i) })}
                        className="text-slate-400 hover:text-red-400"
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
                      className="px-3 py-2 bg-slate-900 border border-slate-200 rounded-md text-sm font-semibold hover:bg-[#0D3650]"
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
            <div className="border-t border-slate-200 p-4 flex gap-2 items-center">
              {!isNew && (
                <button onClick={remove} className="px-3 py-2.5 border border-slate-200 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                  <Trash2 size={14} /> Delete
                </button>
              )}
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 bg-[#8DC63F] text-slate-900 font-bold py-2.5 rounded-lg text-sm hover:brightness-110 disabled:opacity-60"
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

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8DC63F]";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
    {children}
  </div>
);

export default AdminPipeline;
