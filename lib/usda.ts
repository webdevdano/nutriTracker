type UsdaConfig = {
  apiKey: string;
};

function getUsdaConfig(): UsdaConfig {
  const apiKey = process.env.USDA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing USDA_API_KEY. Get one at https://fdc.nal.usda.gov/api-key-signup.html",
    );
  }
  return { apiKey };
}

export type UsdaFood = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
  foodNutrients?: Array<{
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
  }>;
};

export type UsdaSearchResponse = {
  foods: UsdaFood[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
};

export async function searchFoods(
  query: string,
  pageNumber = 1,
  pageSize = 25,
): Promise<UsdaSearchResponse> {
  const { apiKey } = getUsdaConfig();

  const params = new URLSearchParams({
    api_key: apiKey,
    query,
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
    dataType: "Foundation,SR Legacy,Branded",
  });

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?${params.toString()}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`USDA API error (${response.status}): ${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as UsdaSearchResponse;
    return data;
  } catch (err) {
    throw new Error(
      `USDA search failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

export async function getFoodDetails(fdcId: number): Promise<UsdaFood> {
  const { apiKey } = getUsdaConfig();
  const url = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`USDA API error (${response.status}): ${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as UsdaFood;
    return data;
  } catch (err) {
    throw new Error(
      `USDA food details failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
