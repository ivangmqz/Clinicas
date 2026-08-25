"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  value: string | null;
  onChange: (url: string) => void;
  label?: string;
}

/** Sube una imagen al bucket público "clinic-images" y devuelve su URL pública. */
export default function ImageUploader({ value, onChange, label = "Imagen" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("clinic-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("clinic-images").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch {
      setError("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="label">{label}</label>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mb-2 h-32 w-32 rounded-lg object-cover" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-clinic-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-clinic-700 hover:file:bg-clinic-100"
      />
      {uploading && <p className="mt-1 text-xs text-slate-400">Subiendo...</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
