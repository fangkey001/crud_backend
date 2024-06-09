/*
  Warnings:

  - You are about to drop the column `district_id` on the `ThaiSubDistrict` table. All the data in the column will be lost.
  - Added the required column `amphure_id` to the `ThaiSubDistrict` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ThaiSubDistrict" DROP CONSTRAINT "ThaiSubDistrict_district_id_fkey";

-- AlterTable
ALTER TABLE "ThaiSubDistrict" DROP COLUMN "district_id",
ADD COLUMN     "amphure_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ThaiSubDistrict" ADD CONSTRAINT "ThaiSubDistrict_amphure_id_fkey" FOREIGN KEY ("amphure_id") REFERENCES "ThaiDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
