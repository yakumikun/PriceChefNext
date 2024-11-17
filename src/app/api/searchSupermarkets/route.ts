import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    console.log("Request received:", request.url);

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    // if (!lat || !lng || !query) {
    //     return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    // }

    const apiKey = process.env.NEXT_PUBLIC_GoogleAPIKey;
    const radius = 2500;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=supermarket&language=ja&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching supermarkets:", errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Supermarkets data:", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching supermarkets:", error);
        return NextResponse.json({ error: "Failed to fetch supermarkets" }, { status: 500 });
    }
}