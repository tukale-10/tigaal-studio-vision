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
  name: "list_projects",
  title: "List projects",
  description: "List TIGAAL's published projects with donor, location, status, and category.",
  inputSchema: {
    status: z.enum(["active", "past"]).optional().describe("Filter by project status."),
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    let q = client(ctx)
      .from("projects")
      .select("id, title, summary, category, location, donor, status, order_index")
      .eq("published", true);
    if (status) q = q.eq("status", status);
    const { data, error } = await q.order("order_index", { ascending: true }).limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { projects: data },
    };
  },
});
