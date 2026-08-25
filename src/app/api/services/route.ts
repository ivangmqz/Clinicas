import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/services — lista servicios (público ve activos, admin ve todos vía RLS). */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ services: data });
}

/** POST /api/services — crea un servicio (solo admin, forzado por RLS). */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { category, name, description, price, duration_minutes, image_url, active, sort_order } = body;

  if (!category || !name) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("services")
    .insert({
      category,
      name,
      description: description || "",
      price: price ?? null,
      duration_minutes: duration_minutes ?? null,
      image_url: image_url || null,
      active: active ?? true,
      sort_order: sort_order ?? 0
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ service: data }, { status: 201 });
}
