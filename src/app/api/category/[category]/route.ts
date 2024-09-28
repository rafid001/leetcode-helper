import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { category: string } }
) => {
  const { category } = params

  try {
    const questions = await prisma.question.findMany({
      where: {
        categories: {
          some: {
            name: {
              equals: category,
              mode: 'insensitive'
            }
          }
        }
      },
      select: {
        id: true,
        title: true,
        title_slug: true,
        questionId: true,
        categories: {
          select: {
            name: true
          }
        }
      },
    })

    if (questions.length === 0) {
      return NextResponse.json({ message: "No questions found for this category" }, { status: 404 })
    }

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}