import { NextResponse } from 'next/server';

export async function GET() {
    // 必要なら別途データを取得
    const ministryData = [
        { item: '米', price: 1200 },
        { item: '野菜', price: 500 },
    ];
    return NextResponse.json(ministryData);
}