import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database.types";

/** GET /api/settings — configuración pública del sitio (fila única). */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ settings: data });
}

const ALLOWED_FIELDS = [
  "clinic_name",
  "tagline",
  "hero_subtitle",
  "hero_image_url",
  "about_title",
  "about_text",
  "phone",
  "whatsapp_number",
  "email",
  "address",
  "schedule_text",
  "instagram_url",
  "facebook_url",
  "map_embed_url",
  "primary_color"
] as const satisfies readonly (keyof SiteSettings)[];

/** PATCH /api/settings — actualiza la fila única (solo admin, forzado por RLS). */
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const updates: Partial<SiteSettings> = { updated_at: new Date().toISOString() };
  for (const field of ALLOWED_FIELDS) {
    if (field in body) (updates as Record<string, unknown>)[field] = body[field];
  }

  const { data, error } = await supabase.from("site_settings").update(updates).eq("id", 1).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ settings: data });
}
