import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  accept?: string;
  label?: string;
}

const FileUpload = ({ value, onChange, bucket = "cms-documents", accept = ".pdf,.doc,.docx", label = "Upload document" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);

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

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-md border border-slate-200">
          <FileText className="text-[hsl(var(--accent))]" size={20} />
          <a href={value} target="_blank" rel="noopener" className="text-sm text-slate-600 hover:text-slate-900 truncate flex-1">{value.split("/").pop()}</a>
          <button type="button" onClick={() => onChange("")} className="text-slate-400 hover:text-red-400">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-3 p-3 border border-dashed border-slate-200 rounded-md cursor-pointer hover:border-slate-300 transition-colors">
          {uploading ? (
            <span className="text-slate-500 text-sm animate-pulse">Uploading...</span>
          ) : (
            <>
              <Upload className="text-slate-900/20" size={18} />
              <span className="text-slate-500 text-sm">{label}</span>
            </>
          )}
          <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        </label>
      )}
    </div>
  );
};

export default FileUpload;
