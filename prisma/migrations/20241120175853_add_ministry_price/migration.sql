-- CreateTable
CREATE TABLE "MinistryPrice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MinistryPrice_pkey" PRIMARY KEY ("id")
);
