import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function client(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: ctx.isAuthenticated()
      ? { headers: { Authorization: `Bearer ${ctx.getToken()}` } }
      : undefined,
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_publications",
  title: "List publications",
  description: "List TIGAAL's published research publications and reports.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    const { data, error } = await client(ctx)
      .from("publications")
      .select("id, title, summary, published_at, file_url")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { publications: data },
    };
  },
});
