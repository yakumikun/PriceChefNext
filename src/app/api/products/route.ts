import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const storeName = searchParams.get("storeName");

    if (!storeName) {
        return NextResponse.json({ error: "storeName is required" }, { status: 400 });
    }

    try {
        // 商品データを取得
        const products = await prisma.product.findMany({
            where: { storeName },
        });

        // MinistryPriceを取得して比較
        const ministryPrices = await prisma.ministryPrice.findMany();
        const priceMap = new Map(ministryPrices.map((item) => [item.name, item.price]));

        // 比較して`isCheaper`フラグを追加
        const updatedProducts = products.map((product) => ({
            ...product,
            isCheaper: product.price < (priceMap.get(product.name) || Infinity),
        }));

        return NextResponse.json(updatedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}