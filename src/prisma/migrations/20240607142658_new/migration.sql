-- CreateTable
CREATE TABLE "ThaiLocales" (
    "locate_id" INTEGER NOT NULL,
    "province_name" TEXT NOT NULL,
    "province_pf" TEXT NOT NULL,
    "district_name" TEXT NOT NULL,
    "district_pf" TEXT NOT NULL,
    "subdistrict_name" TEXT NOT NULL,
    "subdistrict_pf" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,

    CONSTRAINT "ThaiLocales_pkey" PRIMARY KEY ("locate_id")
);
