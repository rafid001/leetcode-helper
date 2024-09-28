import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CategoryData {
  title_slug: string;
  question_title: string;
  question_id: number;
  categories: string[];
}

export async function POST(req: NextRequest) {  
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const questionsData: CategoryData[] = await req.json();

  try {
    for (const question of questionsData) {
      const {title_slug, question_title, question_id, categories} = question;

      // Check if the question already exists, otherwise create it
      const existingQuestion = await prisma.question.findUnique({
        where: { questionId: question_id }
      });

      const questionRecord = existingQuestion || await prisma.question.create({
        data: {
          title_slug: title_slug,
          title: question_title,
          questionId: question_id,
        }
      });

      // Upsert categories and link to the question
      for (const category of categories) {
        const categoryRecord = await prisma.category.upsert({
          where: { name: category },
          update: {},
          create: { name: category }
        });

        await prisma.question.update({
          where: { id: questionRecord.id },
          data: {
            categories: {
              connect: { id: categoryRecord.id }
            }
          }
        });
      }
    }

    return NextResponse.json({ message: 'Questions and categories saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving questions and categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}