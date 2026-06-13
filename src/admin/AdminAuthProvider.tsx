import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthContext {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AdminAuthCtx = createContext<AdminAuthContext | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthCtx);
  if (!ctx) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);
  const [roleCheckedUserId, setRoleCheckedUserId] = useState<string | null>(null);

  const withTimeout = async <T,>(promise: PromiseLike<T>, ms = 12000): Promise<T> => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error("Admin check timed out")), ms);
    });

    try {
      return await Promise.race([Promise.resolve(promise), timeout]);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  const checkAdmin = async (userId: string) => {
    try {
      const { data, error } = await withTimeout(
        supabase.rpc("has_role", {
          _user_id: userId,
          _role: "admin",
        })
      );
      if (error) {
        console.error("has_role check failed:", error);
        return false;
      }
      return data === true;
    } catch (error) {
      console.error("has_role check failed:", error);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        if (error) console.error("Session restore failed:", error);
        setUser(session?.user ?? null);
      })
      .catch((error) => {
        console.error("Session restore failed:", error);
      })
      .finally(() => {
        if (mounted) setSessionLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setIsAdmin(false);
        setRoleCheckedUserId(null);
      }
      setSessionLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!user?.id) {
      setIsAdmin(false);
      setRoleCheckedUserId(null);
      setRoleLoading(false);
      return;
    }

    setRoleCheckedUserId(null);
    setRoleLoading(true);
    checkAdmin(user.id)
      .then((admin) => {
        if (!cancelled) {
          setIsAdmin(admin);
          setRoleCheckedUserId(user.id);
        }
      })
      .finally(() => {
        if (!cancelled) setRoleLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setRoleCheckedUserId(null);
  };

  const loading = sessionLoading || roleLoading || Boolean(user && roleCheckedUserId !== user.id);

  return (
    <AdminAuthCtx.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AdminAuthCtx.Provider>
  );
};
