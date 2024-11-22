import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '../../../lib/prisma';

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

        const result = await prisma.recipe.create({
            data: {
                name,
                image: imageUrl,
                instructions,
                ingredients,
            },
        })

        return NextResponse.json({ recipe: result }, { status: 201 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;

        console.error('Error in POST /api/recipe:', errorMessage, errorStack);
        return NextResponse.json({ error: 'エラーが発生しました', details: errorMessage }, { status: 500 });
    }
}

// export async function GET(req: Request) {
//     try {
//         const recipes = await prisma.recipe.findMany();
//         return NextResponse.json({ recipes }, { status: 200 });
//     } catch (error) {
//         console.error('Error in GET /api/recipe:', error.message, error.stack);
//         return NextResponse.json({ error: 'データの取得に失敗しました。', details: error.message }, { status: 500 });
//     }
// }

export async function GET() {
    try {
      const recipes = await await prisma.recipe.findMany(); // レシピを取得するロジック
      if (!Array.isArray(recipes)) {
        throw new Error('Invalid data format: recipes must be an array');
      }
      return NextResponse.json({ recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch recipes' },
        { status: 500 }
      );
    }
  }