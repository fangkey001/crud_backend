/*
  Warnings:

  - You are about to drop the column `amphure_id` on the `ThaiSubDistrict` table. All the data in the column will be lost.
  - Added the required column `district_id` to the `ThaiSubDistrict` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ThaiSubDistrict" DROP CONSTRAINT "ThaiSubDistrict_amphure_id_fkey";

-- AlterTable
ALTER TABLE "ThaiSubDistrict" DROP COLUMN "amphure_id",
ADD COLUMN     "district_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ThaiSubDistrict" ADD CONSTRAINT "ThaiSubDistrict_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "ThaiDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
