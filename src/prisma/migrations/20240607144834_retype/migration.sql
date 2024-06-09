/*
  Warnings:

  - The primary key for the `ThaiLocales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `locate_id` on the `ThaiLocales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ThaiLocales" DROP CONSTRAINT "ThaiLocales_pkey",
DROP COLUMN "locate_id",
ADD COLUMN     "locate_id" INTEGER NOT NULL,
ADD CONSTRAINT "ThaiLocales_pkey" PRIMARY KEY ("locate_id");
