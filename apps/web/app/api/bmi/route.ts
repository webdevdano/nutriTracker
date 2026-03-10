import { NextResponse } from "next/server";
import { getBmi } from "@/lib/calculations";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const measurement_units = (url.searchParams.get("measurement_units") || "std") as "std" | "met";

    if (measurement_units !== "std" && measurement_units !== "met") {
      return NextResponse.json(
        { error: "measurement_units must be 'std' or 'met'" },
        { status: 400 },
      );
    }

    const required = measurement_units === "std" ? ["feet", "lbs"] : ["cm", "kilos"];
    for (const key of required) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const result = getBmi({
      measurement_units,
      feet: url.searchParams.get("feet") ?? undefined,
      inches: url.searchParams.get("inches") ?? undefined,
      lbs: url.searchParams.get("lbs") ?? undefined,
      cm: url.searchParams.get("cm") ?? undefined,
      kilos: url.searchParams.get("kilos") ?? undefined,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected server error in /api/bmi" },
      { status: 500 },
    );
  }
}
