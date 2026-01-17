import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// GET - Fetch all favorites for the user
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("saved_favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ favorites: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST - Add a new favorite
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fdc_id, food_name, calories, protein, carbs, fat, serving_size } = body;

    if (!fdc_id || !food_name) {
      return NextResponse.json(
        { error: "Missing required fields: fdc_id and food_name" },
        { status: 400 }
      );
    }

    // Check if already favorited
    const { data: existing } = await supabase
      .from("saved_favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("fdc_id", fdc_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Food already in favorites" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("saved_favorites")
      .insert({
        user_id: user.id,
        fdc_id,
        food_name,
        calories,
        protein,
        carbs,
        fat,
        serving_size: serving_size || 100,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ favorite: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add favorite" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a favorite
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing favorite ID" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("saved_favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete favorite" },
      { status: 500 }
    );
  }
}
