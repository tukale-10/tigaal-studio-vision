import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
}

const ImageUpload = ({ value, onChange, bucket = "cms-images" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setUploading(false);
  }, [bucket, onChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) upload(file);
  };

  return (
    <div>
      {value ? (
        <div className="relative group">
          <img src={value} alt="" className="w-full h-48 object-cover rounded-md border border-slate-200" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 text-slate-900 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            dragOver ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {uploading ? (
            <p className="text-slate-500 text-sm animate-pulse">Uploading...</p>
          ) : (
            <>
              <Upload className="text-slate-900/20 mb-2" size={24} />
              <p className="text-slate-500 text-sm">Drop image or click to browse</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
