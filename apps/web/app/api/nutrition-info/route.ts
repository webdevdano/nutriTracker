import { NextResponse } from "next/server";
import { getNutritionInfo } from "@/lib/calculations";

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

    const requiredBase = ["sex", "age_value"];
    for (const key of requiredBase) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const requiredBody = measurement_units === "std" ? ["feet", "lbs"] : ["cm", "kilos"];
    for (const key of requiredBody) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const result = getNutritionInfo({
      measurement_units,
      sex: url.searchParams.get("sex") ?? "female",
      age_value: url.searchParams.get("age_value") ?? "30",
      activity_level: url.searchParams.get("activity_level") ?? "Active",
      feet: url.searchParams.get("feet") ?? undefined,
      inches: url.searchParams.get("inches") ?? undefined,
      lbs: url.searchParams.get("lbs") ?? undefined,
      cm: url.searchParams.get("cm") ?? undefined,
      kilos: url.searchParams.get("kilos") ?? undefined,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected server error in /api/nutrition-info" },
      { status: 500 },
    );
  }
}
