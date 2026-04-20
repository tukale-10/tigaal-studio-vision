/**
 * Build an optimized image URL using Supabase Storage image transformations.
 * Falls back to the original URL if it's not a Supabase storage URL.
 *
 * Docs: https://supabase.com/docs/guides/storage/serving/image-transformations
 */
export const optimizedImage = (
  url: string | null | undefined,
  opts: { width?: number; height?: number; quality?: number; resize?: "cover" | "contain" | "fill" } = {}
): string | undefined => {
  if (!url) return undefined;

  // Only transform Supabase storage public URLs
  if (!url.includes("/storage/v1/object/public/")) return url;

  const { width = 1200, quality = 70, resize = "cover", height } = opts;
  const renderUrl = url.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");

  const params = new URLSearchParams();
  params.set("width", String(width));
  if (height) params.set("height", String(height));
  params.set("quality", String(quality));
  params.set("resize", resize);

  return `${renderUrl}?${params.toString()}`;
};
