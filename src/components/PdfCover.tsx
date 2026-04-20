import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface PdfCoverProps {
  url: string;
  title: string;
}

const PdfCover = ({ url, title }: PdfCoverProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url, withCredentials: false }).promise;
        if (cancelled) return;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const targetWidth = 480;
        const scale = targetWidth / viewport.width;
        const scaled = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = scaled.width;
        canvas.height = scaled.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport: scaled, canvas }).promise;
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    };
    render();
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div className="relative w-full aspect-[3/4] bg-secondary overflow-hidden">
      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
          {status === "loading" ? (
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          ) : (
            <>
              <FileText size={40} className="text-accent/50" />
              <span className="text-xs px-4 text-center">{title}</span>
            </>
          )}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover object-top transition-opacity duration-300 ${status === "ready" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default PdfCover;
