// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '@/lib/db'; 
// import { Prisma } from '@prisma/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { storeName, products } = req.body;

//         if (!storeName || !Array.isArray(products)) {
//             return res.status(400).json({ error: '店舗名と商品名は必須です。'});
//         }

//         for (const product of products) {
//             if (!product.name || typeof product.price !== 'number' || typeof product.sale !== 'boolean' || !product.date) {
//                 return res.status(400).json({ error: '商品のデータに不備があります。'});
//             }
//         }

//         // データベースに商品の登録処理
//         // productsは[{ name: string, price: number, sale: boolean, date: string }, ...]の配列
//         try {
//             for (const product of products) {
//                 await db.product.create({
//                     data: {
//                         storeName,
//                         ...product,
//                     },
//                 });
//             }
//             res.status(200).json({ message: '商品の登録が完了しました' });
//         } catch (error) {
//             console.error(error);
//             if (error instanceof Prisma.PrismaClientKnownRequestError) {
//                 return res.status(500).json({ error: `データベースエラー: ${error.message}`});
//             }
//             res.status(500).json({ error: '登録に失敗しました' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


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
            products.map((product:  { name: string; price: number; sale: boolean }) =>
                db.product.create({
                    data: {
                        storeName,
                        name: product.name,
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