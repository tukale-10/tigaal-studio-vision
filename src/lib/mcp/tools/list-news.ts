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
  name: "list_news",
  title: "List news & analytical dispatches",
  description: "List published news updates or analytical dispatches from TIGAAL.",
  inputSchema: {
    category: z.enum(["news", "analytical_dispatch"]).optional().describe("Filter by content category."),
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }, ctx) => {
    let q = client(ctx)
      .from("news_updates")
      .select("id, title, excerpt, category, published_at, slug")
      .eq("published", true);
    if (category) q = q.eq("category", category);
    const { data, error } = await q.order("published_at", { ascending: false }).limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { items: data },
    };
  },
});
