/*
  Warnings:

  - You are about to drop the column `district_pf` on the `ThaiLocales` table. All the data in the column will be lost.
  - You are about to drop the column `province_pf` on the `ThaiLocales` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict_pf` on the `ThaiLocales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ThaiLocales" DROP COLUMN "district_pf",
DROP COLUMN "province_pf",
DROP COLUMN "subdistrict_pf";
