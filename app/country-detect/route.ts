import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    if (!ip) {
      return NextResponse.json({
        countryCode: null,
      });
    }

    const cleanIp = ip.replace("::ffff:", "");

    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(cleanIp)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        countryCode: null,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      countryCode: data?.success
        ? data.country_code || null
        : null,
    });
  } catch (error) {
    console.error("Country detection error:", error);

    return NextResponse.json({
      countryCode: null,
    });
  }
}