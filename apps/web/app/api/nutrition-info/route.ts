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

    const requiredBase = ["sex", "age_value", "age_type"];
    for (const key of requiredBase) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const requiredBody =
      measurement_units === "std" ? ["feet", "lbs"] : ["cm", "kilos"];
    for (const key of requiredBody) {
      if (!url.searchParams.get(key)) {
        return NextResponse.json(
          { error: `Missing required query param: ${key}` },
          { status: 400 },
        );
      }
    }

    const ageValue = Number(url.searchParams.get("age_value"));
    const ageType = url.searchParams.get("age_type");
    const needsActivity =
      (ageType === "yrs" && Number.isFinite(ageValue) && ageValue > 3) ||
      (ageType === "mos" && Number.isFinite(ageValue) && ageValue > 36);

    if (needsActivity && !url.searchParams.get("activity_level")) {
      return NextResponse.json(
        {
          error:
            "Missing required query param: activity_level (required for ages above 3 years old)",
        },
        { status: 400 },
      );
    }

    const upstream = await rapidApiGetJson("/api/nutrition-info", url.searchParams);

    if (
      upstream.status === 502 &&
      typeof upstream.data === "object" &&
      upstream.data !== null &&
      "upstreamStatus" in upstream.data &&
      (upstream.data as { upstreamStatus?: unknown }).upstreamStatus === 500
    ) {
      return NextResponse.json(
        {
          ...(upstream.data as object),
          hint:
            "The Nutrition Calculator provider is returning 500. Their docs note this often happens when the underlying USDA DRI Calculator is down. Try again later or verify in the RapidAPI playground.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(upstream.data, { status: upstream.status });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unexpected server error in /api/nutrition-info",
      },
      { status: 500 },
    );
  }
}
