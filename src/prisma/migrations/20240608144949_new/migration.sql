/*
  Warnings:

  - Added the required column `zip_code` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "zip_code" TEXT NOT NULL;
