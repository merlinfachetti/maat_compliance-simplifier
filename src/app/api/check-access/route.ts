import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_FREE,
  COOKIE_ACCESS,
  parseAccessToken,
  FREE_ANALYSES_PER_SESSION,
  PAID_ANALYSES_PER_TOKEN,
} from "@/lib/access";

export async function GET() {
  const cookieStore = await cookies();
  const freeUsed = cookieStore.get(COOKIE_FREE)?.value === "1";
  const accessToken = parseAccessToken(cookieStore.get(COOKIE_ACCESS)?.value);

  return NextResponse.json({
    freeUsed,
    hasPaidAccess: accessToken !== null && accessToken.remaining > 0,
    paidRemaining: accessToken?.remaining ?? 0,
    freeLimit: FREE_ANALYSES_PER_SESSION,
    paidLimit: PAID_ANALYSES_PER_TOKEN,
  });
}
