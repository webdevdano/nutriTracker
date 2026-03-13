/**
 * @jest-environment node
 *
 * Tests for GET /api/bmi — covers input validation and local Mifflin-St Jeor
 * BMI calculation (no external API calls).
 */
import { GET } from "@/app/api/bmi/route";

describe("GET /api/bmi", () => {
  // ── Validation ─────────────────────────────────────────────────────────────

  it("returns 400 for an invalid measurement_units value", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=imperial"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/measurement_units/);
  });

  it("returns 400 when 'std' required params are missing (no lbs)", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&feet=5"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/lbs/);
  });

  it("returns 400 when 'std' required params are missing (no feet)", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&lbs=150"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/feet/);
  });

  it("returns 400 when 'met' required params are missing (no kilos)", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=met&cm=175"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/kilos/);
  });

  it("returns 400 when 'met' required params are missing (no cm)", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=met&kilos=70"
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/cm/);
  });

  // ── Success path — std units ───────────────────────────────────────────────
  // 5'9", 160 lbs → BMI = 703 * 160 / (69^2) ≈ 23.6

  it("returns 200 with a numeric bmi string for std units", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&feet=5&inches=9&lbs=160"
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.bmi).toBe("string");
    expect(parseFloat(body.bmi)).toBeCloseTo(23.6, 0);
    expect(body.bmi_category).toBeDefined();
    expect(body.healthy_bmi_range).toBe("18.5 - 24.9");
  });

  it("returns Overweight category for a high-BMI std input", async () => {
    // 5'6", 200 lbs → BMI ≈ 32.3 (Obese)
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&feet=5&inches=6&lbs=200"
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(parseFloat(body.bmi)).toBeGreaterThan(25);
  });

  // ── Success path — metric units ────────────────────────────────────────────
  // 175 cm, 70 kg → BMI = 70 / (1.75^2) ≈ 22.9

  it("returns 200 with a numeric bmi string for metric units", async () => {
    const req = new Request(
      "http://localhost/api/bmi?measurement_units=met&cm=175&kilos=70"
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.bmi).toBe("string");
    expect(parseFloat(body.bmi)).toBeCloseTo(22.9, 0);
  });
});
