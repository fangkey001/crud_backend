/*
  Warnings:

  - You are about to drop the column `district` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `Person` table. All the data in the column will be lost.
  - Added the required column `district_id` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district_id` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "district",
DROP COLUMN "province",
DROP COLUMN "zip_code",
ADD COLUMN     "district_id" INTEGER NOT NULL,
ADD COLUMN     "province_id" INTEGER NOT NULL,
ADD COLUMN     "sub_district_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "ThaiProvinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "ThaiDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_sub_district_id_fkey" FOREIGN KEY ("sub_district_id") REFERENCES "ThaiSubDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
