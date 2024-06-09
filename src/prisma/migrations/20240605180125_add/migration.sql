-- CreateTable
CREATE TABLE "ThaiGeographies" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ThaiGeographies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThaiProvinces" (
    "id" INTEGER NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "geography_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "ThaiProvinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThaiDistrict" (
    "id" INTEGER NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "ThaiDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThaiSubDistrict" (
    "id" INTEGER NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "ThaiSubDistrict_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThaiProvinces" ADD CONSTRAINT "ThaiProvinces_geography_id_fkey" FOREIGN KEY ("geography_id") REFERENCES "ThaiGeographies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThaiDistrict" ADD CONSTRAINT "ThaiDistrict_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "ThaiProvinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThaiSubDistrict" ADD CONSTRAINT "ThaiSubDistrict_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "ThaiDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
