## 目次

__1. [プロジェクト概要]__  
__2. [使用技術一覧]__  
__3. [ディレクトリ構成]__  
__4. [必要な環境変数]__


## プロジェクト概要

__スーパーマーケットの価格比較アプリ　__「PriceChef」____

このアプリは、自炊をされる方に向けて、現在地周辺のスーパーマーケットの商品価格を比較するサポートをし、ユーザーの選んだレシピから節約になる店舗を提案します。


## 使用技術一覧
<p style="display: inline">
<img src="https://img.shields.io/badge/-Typescript-000000.svg?logo=typescript&style=for-the-badge">
<img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
<img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
<img src="https://img.shields.io/badge/-React-000000.svg?logo=react&style=for-the-badge">
<img src="https://img.shields.io/badge/-TAILWINDCSS-000000.svg?logo=Tailwind%20css&style=for-the-badge">
<img src="https://img.shields.io/badge/-Postgresql-32.svg?logo=postgresql&style=for-the-badge">
<img src="https://img.shields.io/badge/-Prisma-468.svg?logo=prisma&style=for-the-badge">
<img src="https://img.shields.io/badge/-Npm-1e90ff.svg?logo=npm&style=for-the-badge">
<img src="https://img.shields.io/badge/-Amazon%20aws-232F3E.svg?logo=amazon-aws&style=for-the-badge">
</p>

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| TypeScript            | 5.6.3      |
| Next.js               | 15.0.3     |
| Node.js               | 20.15.0    |
| React                 | 18.3.1     |
| Tailwind css          | 3.4.1      |
| PostgreSQL            | 14.13      |
| Prisma                | 5.22.0     |
| npm                   | 10.7.0     |

## ディレクトリ構成
```plaintext
.
├── LICENSE
├── README.md
├── favicon.ico
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   └── schema.prisma
├── public
│   └── shoppingList.svg
├── src
│   ├── app
│   ├── components
│   ├── fonts
│   ├── hooks
│   └── lib
├── tailwind.config.ts
└── tsconfig.json
```

## 必要な環境変数

以下の変数は.envファイル内に記述してください。

|           変数名          | 例                                                                                 | 用途                                                           |
|--------------------------|-------------------------------------------------------------------------------------|------------------------------------------------------------------|
| NEXT_PUBLIC_GoogleAPIKey | your-api-key                                                                        | Google Maps APIのキー                                           |
| DATABASE_URL             | postgresql://your-user-name:your-password@localhost:5432/your-database?schema=public| PostgreSQL接続情報                                              |
| DB_HOST                  | localhost                                                                           | データベースのホスト名                                          |
| DB_PORT                  | 5432                                                                                | データベースのポート番号（通常は5432）                          |
| DB_USER                  | your-user-name                                                                      | データベースユーザー名                                          |
| DB_PASSWORD              | your-password                                                                       | データベースユーザーパスワード                                  |
| DB_NAME                  | your-database                                                                       | データベース名                                                 |
| AWS_ACCESS_KEY_ID        | your-aws-access-key-id                                                              | AWSサービスを利用するためのアクセスキー                        |
| AWS_SECRET_ACCESS_KEY    | your-aws-secret-access-key                                                          | AWSサービスを利用するためのシークレットキー                    |
| AWS_BUCKET_NAME          | your-s3-bucket-name                                                                | AWS S3のバケット名                                              |
| AWS_REGION               | us-east-1                                                                          | AWSリソースが存在するリージョン（例: us-east-1）                |

