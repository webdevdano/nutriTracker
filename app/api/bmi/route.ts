import { NextResponse } from "next/server";
import { rapidApiGetJson } from "@/lib/rapidapi";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const measurement_units = url.searchParams.get("measurement_units") || "std";

    if (measurement_units !== "std" && measurement_units !== "met") {
      return NextResponse.json(
        { error: "measurement_units must be 'std' or 'met'" },
        { status: 400 },
      );
    }

    const required =
      measurement_units === "std" ? ["feet", "lbs"] : ["cm", "kilos"];
    for (const key of required) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const upstream = await rapidApiGetJson("/api/bmi", url.searchParams);
    return NextResponse.json(upstream.data, { status: upstream.status });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Unexpected server error in /api/bmi",
      },
      { status: 500 },
    );
  }
}
