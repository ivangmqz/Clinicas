import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/leads — lista solicitudes de cita (solo admin, forzado por RLS). */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointment_requests")
    .select("*, services(name)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ leads: data });
}

/** POST /api/leads — envío del formulario público de contacto/cita. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { name, phone, email, service_id, preferred_date, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Nombre y teléfono son obligatorios" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointment_requests")
    .insert({
      name,
      phone,
      email: email || null,
      service_id: service_id || null,
      preferred_date: preferred_date || null,
      message: message || ""
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ lead: data }, { status: 201 });
}
