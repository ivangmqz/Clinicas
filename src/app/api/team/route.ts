import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ team: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { name, role_title, bio, photo_url, active, sort_order } = body;
  if (!name) return NextResponse.json({ error: "Falta el nombre" }, { status: 400 });

  const { data, error } = await supabase
    .from("team_members")
    .insert({
      name,
      role_title: role_title || "",
      bio: bio || "",
      photo_url: photo_url || null,
      active: active ?? true,
      sort_order: sort_order ?? 0
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ member: data }, { status: 201 });
}
