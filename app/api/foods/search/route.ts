import { NextResponse } from "next/server";
import { searchFoods } from "@/lib/usda";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const pageNumber = Number(url.searchParams.get("page") || "1");
    const pageSize = Number(url.searchParams.get("pageSize") || "25");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing required query param: query" },
        { status: 400 },
      );
    }

    const data = await searchFoods(query.trim(), pageNumber, pageSize);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Food search failed",
      },
      { status: 500 },
    );
  }
}
