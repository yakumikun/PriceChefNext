import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export { db };

export interface Recipe {
    id: number;
    name: string;
    image: string;
    ingredients: string[];
    instructions: string[];
  }