import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Building2, Calendar, X, Inbox } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const AdminContacts = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setSubmissions(data);
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display text-white mb-1">Contact Submissions</h1>
        <p className="text-white/40 text-sm">{submissions.length} message{submissions.length !== 1 ? "s" : ""} received</p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg h-20 animate-pulse" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white/5 border border-white/5 rounded-lg p-12 text-center">
          <Inbox className="mx-auto text-white/20 mb-3" size={40} />
          <p className="text-white/40 text-sm">No submissions yet</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
            <div className="col-span-3">From</div>
            <div className="col-span-3">Organization</div>
            <div className="col-span-4">Subject</div>
            <div className="col-span-2">Received</div>
          </div>
          {submissions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors text-left"
            >
              <div className="col-span-3">
                <div className="text-white text-sm font-medium">{s.name}</div>
                <div className="text-white/40 text-xs truncate">{s.email}</div>
              </div>
              <div className="col-span-3 text-white/60 text-sm truncate">{s.organization || "—"}</div>
              <div className="col-span-4 text-white/80 text-sm truncate">{s.subject}</div>
              <div className="col-span-2 text-white/40 text-xs">{formatDate(s.created_at)}</div>
            </button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-[#0f172a] border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-xl font-display text-white mb-1">{selected.subject}</h2>
                <p className="text-white/40 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(selected.created_at)}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">From</p>
                  <p className="text-white text-sm font-medium">{selected.name}</p>
                  <a href={`mailto:${selected.email}`} className="text-[hsl(var(--accent))] text-xs flex items-center gap-1 mt-1 hover:underline">
                    <Mail size={12} /> {selected.email}
                  </a>
                </div>
                {selected.organization && (
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Organization</p>
                    <p className="text-white text-sm flex items-center gap-1">
                      <Building2 size={14} className="text-white/40" /> {selected.organization}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Message</p>
                <div className="bg-white/5 rounded-md p-4 text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
