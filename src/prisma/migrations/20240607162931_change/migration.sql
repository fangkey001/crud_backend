/*
  Warnings:

  - You are about to drop the column `zipcode` on the `ThaiLocales` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `ThaiLocales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThaiLocales" DROP COLUMN "zipcode",
ADD COLUMN     "zip_code" INTEGER NOT NULL;
