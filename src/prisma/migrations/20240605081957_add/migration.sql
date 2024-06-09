/*
  Warnings:

  - You are about to drop the column `name` on the `Person` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_card]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expire_id_card` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_card` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "expire_id_card" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "id_card" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "sub_district" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_id_card_key" ON "Person"("id_card");
