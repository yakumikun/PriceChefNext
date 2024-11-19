import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {

    try { // リクエストからデータを取得
        const { storeName, products } = await req.json();

        console.log('Received storeName:', storeName);
        console.log('Received products:', products);



        // 入力チェック
        if (!Array.isArray(products) || products.length === 0) {
            return NextResponse.json(
                { error: '商品リストが空です。少なくとも1つの商品を登録してください。' },
                { status: 400 }
            );
        }

        // 商品登録処理
        const createdProducts = await Promise.all(
            products.map((product:  { name: string; quantity: string, price: number; sale: boolean }) =>
                db.product.create({
                    data: {
                        storeName,
                        name: product.name,
                        quantity: product.quantity,
                        price: product.price,
                        sale: product.sale,
                    },
                })
            )

        );

        // 登録成功のレスポンス
        return NextResponse.json(
            { message: '商品の登録が完了しました', products: createdProducts },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);

        // PrismaErrorの場合
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `エラー: ${error.message}` },
                { status: 500 }
            );
        }

        // その他のエラー
        return NextResponse.json(
            { error: '登録に失敗しました' },
            { status: 500 }
        );
    }
}