import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listProjects from "./tools/list-projects";
import listTeam from "./tools/list-team";
import listNews from "./tools/list-news";
import listPublications from "./tools/list-publications";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "tigaal-mcp",
  title: "TIGAAL MCP",
  version: "0.1.0",
  instructions:
    "Tools for browsing TIGAAL's services, projects, team, news, analytical dispatches, and publications. Use these to answer questions about TIGAAL's work in the Horn of Africa.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServices, listProjects, listTeam, listNews, listPublications],
});
