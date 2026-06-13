import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, UserPlus } from "lucide-react";
import { useAdminAuth } from "./AdminAuthProvider";

interface AdminUser {
  user_id: string;
  role: string;
  email?: string;
}

const AdminUsers = () => {
  const { user } = useAdminAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    const { data } = await supabase.from("user_roles").select("user_id, role");
    setAdmins((data as AdminUser[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleInvite = async () => {
    if (!inviteEmail || !invitePassword) return;
    setInviting(true);
    setMessage("");

    // Note: In invite-only mode, signup is disabled.
    // Admin users must be created via Supabase dashboard or via service role.
    // This UI shows the current approach for documentation.
    setMessage("To add a new admin: 1) Create the user in Lovable Cloud → Users, 2) Then add their role via the database. Signup is disabled for security.");
    setInviting(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display text-slate-900 mb-1">Users & Roles</h1>
        <p className="text-slate-500 text-sm">Manage admin access to the CMS</p>
      </div>

      {/* Current admins */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Current Admins</h2>
        {loading ? (
          <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}</div>
        ) : admins.length === 0 ? (
          <p className="text-slate-400 text-sm">No admin roles assigned yet.</p>
        ) : (
          <div className="space-y-2">
            {admins.map((admin) => (
              <div key={admin.user_id} className="flex items-center gap-4 bg-white/[0.03] border border-slate-200 rounded-lg p-4">
                <Shield className="text-[hsl(var(--accent))]" size={20} />
                <div className="flex-1">
                  <p className="text-slate-900 text-sm font-mono">{admin.user_id}</p>
                  <p className="text-slate-500 text-xs capitalize">{admin.role}{admin.user_id === user?.id ? " (you)" : ""}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite instructions */}
      <div className="bg-white/[0.03] border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <UserPlus className="text-[hsl(var(--accent))]" size={20} />
          <h2 className="text-lg font-semibold text-slate-900">Add New Admin</h2>
        </div>
        <div className="text-slate-500 text-sm space-y-3">
          <p>Since signup is disabled for security, adding new admins requires two steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-500">
            <li>Go to <strong className="text-slate-600">Lovable Cloud → Users</strong> and create a new user with email & password</li>
            <li>Copy their User ID, then add a row to the <strong className="text-slate-600">user_roles</strong> table with their user_id and role = 'admin'</li>
          </ol>
          <p className="text-slate-400 text-xs mt-4">This ensures only authorized personnel can access the CMS.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
