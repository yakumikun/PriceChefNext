import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // データベース接続用

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const storeName = searchParams.get('storeName'); // storeName を使う

    console.log('Store Name:', storeName);

    if (!storeName) {
      console.error('Error: storeName is missing');
      return NextResponse.json({ error: 'storeName is required' }, { status: 400 });
    }

    const products = await db.product.findMany({
      where: { storeName }, // storeName を条件に検索
    });

    console.log('Fetched products:', products);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const storeName = searchParams.get('storeName'); // storeName を使う

//         console.log('Store Name:', storeName);

//         if (!storeName) {
//             console.error('Error: storeName is missing');
//             return NextResponse.json({ error: 'storeName is required' }, { status: 400 });
//         }

//         const products = await db.product.findMany({
//             where: { storeName }, // storeName を条件に検索
//         });

//         const uniqueProducts = products.filter((value, index, self) => 
//             index === self.findIndex((t) => (
//                 t.storeName === value.storeName
//             ))
//         );

//         console.log('Unique products:', uniqueProducts);


//         console.log('Fetched products:', products);

//         if (!products || products.length === 0) {
//             return NextResponse.json({ error: 'No products found' }, { status: 404 });
//         }

//         return NextResponse.json(uniqueProducts);
//     } catch (error) {
//         console.error('Error in GET /api/products:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }