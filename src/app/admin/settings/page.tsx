"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Database } from "@/types/database.types";

type Settings = Database["public"]["Tables"]["site_settings"]["Row"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    setSaving(false);
    if (!res.ok) {
      setError("No se pudo guardar. Intenta de nuevo.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!settings) return <p className="text-slate-500">Cargando...</p>;

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-clinic-900">Información del sitio</h1>
      <p className="mt-1 text-sm text-slate-500">Estos datos se muestran en la página pública.</p>

      <form onSubmit={handleSubmit} className="admin-card mt-6 space-y-6">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase text-slate-400">General</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Nombre de la clínica</label>
              <input className="input" value={settings.clinic_name} onChange={(e) => set("clinic_name", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Frase principal (hero)</label>
              <input className="input" value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Subtítulo del hero</label>
              <textarea
                className="textarea"
                rows={2}
                value={settings.hero_subtitle}
                onChange={(e) => set("hero_subtitle", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploader
                label="Imagen principal (hero)"
                value={settings.hero_image_url}
                onChange={(url) => set("hero_image_url", url)}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase text-slate-400">Sobre nosotros</h2>
          <div className="grid gap-4">
            <div>
              <label className="label">Título</label>
              <input className="input" value={settings.about_title} onChange={(e) => set("about_title", e.target.value)} />
            </div>
            <div>
              <label className="label">Texto</label>
              <textarea
                className="textarea"
                rows={4}
                value={settings.about_text}
                onChange={(e) => set("about_text", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase text-slate-400">Contacto</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Teléfono</label>
              <input className="input" value={settings.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label className="label">WhatsApp (sin +, ej. 521234567890)</label>
              <input
                className="input"
                value={settings.whatsapp_number}
                onChange={(e) => set("whatsapp_number", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Correo</label>
              <input className="input" value={settings.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <label className="label">Horario</label>
              <input
                className="input"
                placeholder="Lun-Vie 9:00-19:00"
                value={settings.schedule_text}
                onChange={(e) => set("schedule_text", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Dirección</label>
              <input className="input" value={settings.address} onChange={(e) => set("address", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">URL de mapa embebido (Google Maps &quot;insertar mapa&quot;)</label>
              <input
                className="input"
                placeholder="https://www.google.com/maps/embed?..."
                value={settings.map_embed_url ?? ""}
                onChange={(e) => set("map_embed_url", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Instagram (URL)</label>
              <input
                className="input"
                value={settings.instagram_url ?? ""}
                onChange={(e) => set("instagram_url", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Facebook (URL)</label>
              <input
                className="input"
                value={settings.facebook_url ?? ""}
                onChange={(e) => set("facebook_url", e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {saved && <p className="text-sm text-clinic-600">Guardado correctamente.</p>}

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
