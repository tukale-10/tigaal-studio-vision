import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const email = "ridwan.tukale@outlook.com";
  const password = "tigaal@2026";

  // Create user
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError && !createError.message.includes("already")) {
    return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
  }

  const userId = userData?.user?.id;
  if (!userId) {
    // User might already exist, try to find them
    const { data: users } = await supabase.auth.admin.listUsers();
    const existing = users?.users?.find((u: any) => u.email === email);
    if (!existing) {
      return new Response(JSON.stringify({ error: "Could not find or create user" }), { status: 400 });
    }
    // Add admin role for existing user
    const { error: roleError } = await supabase.from("user_roles").upsert(
      { user_id: existing.id, role: "admin" },
      { onConflict: "user_id,role" }
    );
    return new Response(JSON.stringify({ success: true, userId: existing.id, roleError: roleError?.message }));
  }

  // Add admin role
  const { error: roleError } = await supabase.from("user_roles").upsert(
    { user_id: userId, role: "admin" },
    { onConflict: "user_id,role" }
  );

  return new Response(JSON.stringify({ success: true, userId, roleError: roleError?.message }));
});
