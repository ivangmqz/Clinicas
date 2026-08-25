import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/products — lista productos (público ve activos, admin ve todos vía RLS). */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ products: data });
}

/** POST /api/products — crea un producto (solo admin, forzado por RLS). */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { name, description, sku, category, price, stock, low_stock_threshold, image_url, active, sort_order } =
    body;

  if (!name) return NextResponse.json({ error: "Falta el nombre" }, { status: 400 });

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description: description || "",
      sku: sku || null,
      category: category || "",
      price: price ?? null,
      stock: stock ?? 0,
      low_stock_threshold: low_stock_threshold ?? 5,
      image_url: image_url || null,
      active: active ?? true,
      sort_order: sort_order ?? 0
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ product: data }, { status: 201 });
}
