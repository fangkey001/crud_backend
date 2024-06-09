/*
  Warnings:

  - The primary key for the `ThaiLocales` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ThaiLocales" DROP CONSTRAINT "ThaiLocales_pkey",
ALTER COLUMN "locate_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ThaiLocales_pkey" PRIMARY KEY ("locate_id");
