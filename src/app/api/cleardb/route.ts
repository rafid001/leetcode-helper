import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Delete all records from your tables
    await prisma.category.deleteMany({});
    await prisma.question.deleteMany({});

    // Reset auto-increment counters if needed
    await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Question_id_seq" RESTART WITH 1`;

    return NextResponse.json({ message: "Database cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing database:", error);
    return NextResponse.json({ message: "Error clearing database" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}