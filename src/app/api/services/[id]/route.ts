import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types/database.types";

interface Params {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = [
  "category",
  "name",
  "description",
  "price",
  "duration_minutes",
  "image_url",
  "active",
  "sort_order"
] as const satisfies readonly (keyof Service)[];

/** PATCH /api/services/:id — edita un servicio (solo admin, forzado por RLS). */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const updates: Partial<Service> = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in body) (updates as Record<string, unknown>)[field] = body[field];
  }

  const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ service: data });
}

/** DELETE /api/services/:id — elimina un servicio (solo admin, forzado por RLS). */
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
