import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/database.types";

interface Params {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = [
  "name",
  "description",
  "sku",
  "category",
  "price",
  "stock",
  "low_stock_threshold",
  "image_url",
  "active",
  "sort_order"
] as const satisfies readonly (keyof Product)[];

/** PATCH /api/products/:id — edita un producto, incluido el stock (solo admin, forzado por RLS). */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const updates: Partial<Product> = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in body) (updates as Record<string, unknown>)[field] = body[field];
  }

  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ product: data });
}

/** DELETE /api/products/:id — elimina un producto (solo admin, forzado por RLS). */
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
