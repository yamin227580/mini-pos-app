/*
  Warnings:

  - Added the required column `date` to the `Total` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Total" ADD COLUMN     "date" TEXT NOT NULL;
