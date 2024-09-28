/*
  Warnings:

  - Added the required column `title_slug` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_QuestionCategories" DROP CONSTRAINT "_QuestionCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCategories" DROP CONSTRAINT "_QuestionCategories_B_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "title_slug" TEXT NOT NULL;
