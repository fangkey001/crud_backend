/*
  Warnings:

  - The primary key for the `ThaiLocales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locate_id` on the `ThaiLocales` table. All the data in the column will be lost.
  - Added the required column `id` to the `ThaiLocales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThaiLocales" DROP CONSTRAINT "ThaiLocales_pkey",
DROP COLUMN "locate_id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "ThaiLocales_pkey" PRIMARY KEY ("id");
