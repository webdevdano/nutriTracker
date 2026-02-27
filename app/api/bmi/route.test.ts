/**
 * @jest-environment node
 *
 * Tests for GET /api/bmi — covers input validation and upstream API delegation.
 * rapidApiGetJson is mocked so no real network calls are made.
 */
import { GET } from "@/app/api/bmi/route";
import { rapidApiGetJson } from "@/lib/rapidapi";

jest.mock("@/lib/rapidapi");

const mockRapidApi = rapidApiGetJson as jest.MockedFunction<typeof rapidApiGetJson>;

describe("GET /api/bmi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  // ── Success path ───────────────────────────────────────────────────────────

  it("delegates to rapidApiGetJson and returns its data for std units", async () => {
    mockRapidApi.mockResolvedValueOnce({ data: { bmi: 22.5, category: "Normal" }, status: 200 });

    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&feet=5&lbs=150"
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bmi).toBe(22.5);
    expect(mockRapidApi).toHaveBeenCalledTimes(1);
    expect(mockRapidApi).toHaveBeenCalledWith("/api/bmi", expect.any(URLSearchParams));
  });

  it("delegates to rapidApiGetJson and returns its data for met units", async () => {
    mockRapidApi.mockResolvedValueOnce({ data: { bmi: 24.2 }, status: 200 });

    const req = new Request(
      "http://localhost/api/bmi?measurement_units=met&cm=175&kilos=74"
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bmi).toBe(24.2);
  });

  // ── Error path ─────────────────────────────────────────────────────────────

  it("returns 500 and error message when rapidApiGetJson throws", async () => {
    mockRapidApi.mockRejectedValueOnce(new Error("Missing RAPIDAPI_KEY"));

    const req = new Request(
      "http://localhost/api/bmi?measurement_units=std&feet=5&lbs=150"
    );
    const res = await GET(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/Missing RAPIDAPI_KEY/);
  });
});
