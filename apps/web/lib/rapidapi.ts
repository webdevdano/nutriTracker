type RapidApiConfig = {
  key: string;
  host: string;
};

function getRapidApiConfig(): RapidApiConfig {
  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST || "nutrition-calculator.p.rapidapi.com";

  if (!key) {
    throw new Error(
      "Missing RAPIDAPI_KEY. Add it to .env.local (see .env.example).",
    );
  }

  return { key, host };
}

export async function rapidApiGetJson<T>(
  path: string,
  searchParams: URLSearchParams,
): Promise<{ status: number; data: T | unknown }> {
  const { key, host } = getRapidApiConfig();
  const url = `https://${host}${path}?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const rawText = await response.text();
    let data: unknown;
    try {
      data = rawText.length ? JSON.parse(rawText) : null;
    } catch {
      data = {
        error: "Non-JSON response from upstream",
        snippet: rawText.slice(0, 600),
      };
    }

    if (response.status >= 500) {
      return {
        status: 502,
        data: {
          error: "Upstream service error",
          upstreamStatus: response.status,
          upstreamData: data,
        },
      };
    }

    return { status: response.status, data: data as T };
  } catch (err) {
    return {
      status: 502,
      data: {
        error: "Upstream request failed",
        details: err instanceof Error ? err.message : String(err),
      },
    };
  }
}
