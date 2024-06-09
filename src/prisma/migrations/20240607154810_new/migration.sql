/*
  Warnings:

  - Added the required column `zip_code` to the `ThaiSubDistrict` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThaiSubDistrict" ADD COLUMN     "zip_code" INTEGER NOT NULL;
