import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token, supabaseUrl, anonKey]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) { setState("error"); return; }
      if (data?.success) setState("success");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <main>
      <PageHero title="Unsubscribe" subtitle="Manage your email preferences" breadcrumb="Unsubscribe" />
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <div className="bg-secondary rounded-sm p-8 lg:p-12 border border-border text-center">
            {state === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="text-accent animate-spin" size={32} />
                <p className="text-muted-foreground text-sm">Validating your request…</p>
              </div>
            )}

            {state === "valid" && (
              <>
                <h2 className="font-display text-2xl text-foreground mb-3">Confirm unsubscribe</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Click below to stop receiving emails from Tigaal.
                </p>
                <button
                  onClick={confirm}
                  className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
                >
                  Confirm Unsubscribe
                </button>
              </>
            )}

            {state === "submitting" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="text-accent animate-spin" size={32} />
                <p className="text-muted-foreground text-sm">Processing…</p>
              </div>
            )}

            {state === "success" && (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="text-accent" size={40} />
                <h2 className="font-display text-2xl text-foreground">You've been unsubscribed</h2>
                <p className="text-muted-foreground text-sm">You will no longer receive emails from us.</p>
              </div>
            )}

            {state === "already" && (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="text-accent" size={40} />
                <h2 className="font-display text-2xl text-foreground">Already unsubscribed</h2>
                <p className="text-muted-foreground text-sm">This email is already removed from our list.</p>
              </div>
            )}

            {(state === "invalid" || state === "error") && (
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="text-destructive" size={40} />
                <h2 className="font-display text-2xl text-foreground">Something went wrong</h2>
                <p className="text-muted-foreground text-sm">
                  {state === "invalid" ? "This link is invalid or expired." : "Please try again later."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Unsubscribe;
