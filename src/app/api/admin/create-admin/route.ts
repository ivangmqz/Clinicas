import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/admin/create-admin — crea un nuevo usuario administrador.
 * Solo puede invocarlo un admin ya autenticado (verificado aquí, no por RLS,
 * porque usa la Service Role Key para crear el usuario en auth.users).
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role, active").eq("id", user.id).single();
  if (!profile || profile.role !== "admin" || !profile.active) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await request.json();
  const { email, password, full_name } = body;
  if (!email || !password || !full_name) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (createError || !created.user) {
    return NextResponse.json({ error: createError?.message ?? "No se pudo crear el usuario" }, { status: 400 });
  }

  const { error: profileError } = await adminClient.from("profiles").insert({
    id: created.user.id,
    full_name,
    role: "admin",
    active: true
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
