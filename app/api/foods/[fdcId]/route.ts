import { NextResponse } from "next/server";
import { getFoodDetailsService } from "@/lib/food-service";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fdcId: string }> },
) {
  try {
    const { fdcId } = await params;
    const fdcIdNum = Number(fdcId);

    if (!Number.isFinite(fdcIdNum)) {
      return NextResponse.json({ error: "Invalid fdcId" }, { status: 400 });
    }

    const data = await getFoodDetailsService(fdcIdNum);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Food details failed",
      },
      { status: 500 },
    );
  }
}
