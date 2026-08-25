import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/types/database.types";

interface Params {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = [
  "name",
  "role_title",
  "bio",
  "photo_url",
  "active",
  "sort_order"
] as const satisfies readonly (keyof TeamMember)[];

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const updates: Partial<TeamMember> = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in body) (updates as Record<string, unknown>)[field] = body[field];
  }

  const { data, error } = await supabase.from("team_members").update(updates).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ member: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
