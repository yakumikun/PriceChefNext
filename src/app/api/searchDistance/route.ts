import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
  const origins = req.nextUrl.searchParams.get('origins');
  const destinations = req.nextUrl.searchParams.get('destinations');

  if (!origins || !destinations) {
    return NextResponse.json({ error: 'Missing origins or destinations parameters' }, { status: 400 });
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${process.env.NEXT_PUBLIC_GoogleAPIKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch distance data' }, { status: 500 });
  }
}