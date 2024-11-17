import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';


export async function POST(req: Request) {
    try {
        const { name, image_url, instructions, ingredients } = await req.json();

        // 必須項目がすべてあるか確認
        if (!name || !image_url || !instructions || !ingredients) {
            return NextResponse.json({ error: 'すべての項目を入力してください' }, { status: 400 });
        }

        // データベースにレシピを挿入
        const result = await db.query(
            'INSERT INTO Recipe (name, image_url, instructions, ingredients) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, image_url, instructions, ingredients]
        );

        return NextResponse.json({ recipe: result.rows[0] }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
    }
}