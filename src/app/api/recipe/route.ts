import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { db } from '../../../lib/db';

const s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

async function uploadToS3(file: Buffer, fileName: string): Promise<string> {
    const bucketName = process.env.AWS_BUCKET_NAME!;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ContentType: 'image/jpeg',
    });

    await s3.send(command);

    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
}


export async function POST(req: Request) {
    try {
        const { name, instructions, ingredients, image } = await req.json();

        if (!name || !instructions || !ingredients || !image) {
            return NextResponse.json({ error: 'すべての項目を入力してください' }, { status: 400 });
        }

        const buffer = Buffer.from(image, 'base64');
        const imageFileName = `${Date.now()}-recipe.png`;
        const imageUrl = await uploadToS3(buffer, imageFileName);

        const result = await db.recipe.create({
            data: {
                name,
                image: imageUrl,
                instructions,
                ingredients,
            },
        })

        return NextResponse.json({ recipe: result }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/recipe:', error.message, error.stack);
        return NextResponse.json({ error: 'エラーが発生しました', details: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const recipes = await db.recipe.findMany();
        return NextResponse.json({ recipes }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/recipe:', error.message, error.stack);
        return NextResponse.json({ error: 'データの取得に失敗しました。', details: error.message }, { status: 500 });
    }
}