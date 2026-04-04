import { useState } from "react";
import { useAdminAuth } from "./AdminAuthProvider";
import { Navigate } from "react-router-dom";
import logo from "@/assets/tigaal-logo.webp";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-primary-foreground/60">Loading...</div>
      </div>
    );
  }

  if (user && isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    if (err) setError(err);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src={logo} alt="TIGAAL" className="h-10 brightness-0 invert mx-auto mb-6" />
          <h1 className="font-display text-3xl text-primary-foreground mb-2">Admin Panel</h1>
          <p className="text-primary-foreground/50 text-sm">Sign in with your admin credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@tigaal.com"
              required
            />
          </div>

          <div>
            <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
