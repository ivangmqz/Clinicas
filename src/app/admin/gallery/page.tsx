"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Database } from "@/types/database.types";

type Image = Database["public"]["Tables"]["gallery_images"]["Row"];

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleAdd() {
    if (!newUrl) return;
    setSaving(true);
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: newUrl, caption })
    });
    setSaving(false);
    if (res.ok) {
      setNewUrl(null);
      setCaption("");
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta imagen?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-clinic-900">Galería</h1>
      <p className="mt-1 text-sm text-slate-500">Fotos del consultorio y resultados de tratamientos.</p>

      <div className="admin-card mt-6 max-w-md">
        <h2 className="mb-3 font-semibold text-clinic-900">Agregar foto</h2>
        <ImageUploader value={newUrl} onChange={setNewUrl} />
        <div className="mt-3">
          <label className="label">Descripción (opcional)</label>
          <input className="input" value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <button onClick={handleAdd} disabled={!newUrl || saving} className="btn-primary mt-3 disabled:opacity-60">
          {saving ? "Agregando..." : "Agregar a la galería"}
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.image_url} alt={img.caption} className="h-full w-full object-cover" />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-red-500 opacity-0 shadow transition group-hover:opacity-100"
              >
                Eliminar
              </button>
            </div>
          ))}
          {images.length === 0 && <p className="text-slate-500">No hay fotos todavía.</p>}
        </div>
      )}
    </div>
  );
}
