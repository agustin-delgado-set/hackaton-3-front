import { NextRequest, NextResponse } from "next/server";

const PRODUCTS_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

/* export async function GET() {
  const response = await fetch(`${PRODUCTS_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
} */

export async function POST(request: NextRequest) {
  const orderData = await request.json();

  return NextResponse.json(orderData);
}

