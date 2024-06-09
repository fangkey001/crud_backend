import { Request, Response } from "express";
import prisma from "../database";

export const getLocales = async (req: Request, res: Response) => {
    const { province, district, sub_district } = req.query;

    try {
        if (province) {
            const districts = await prisma.thaiLocales.findMany({
                select: {
                    district_name: true
                },
                where: {
                    province_name: province as string
                },
                distinct: ["district_name"],
            });

            res.status(200).json({
                status: 200,
                message: "Get all districts successfully",
                data: districts
            });
        } else if (district) {
            const sub_districts = await prisma.thaiLocales.findMany({
                select: {
                    subdistrict_name: true
                },
                where: {
                    district_name: district as string
                },
                distinct: ["subdistrict_name"],
            });

            res.status(200).json({
                status: 200,
                message: "Get all sub districts successfully",
                data: sub_districts
            });
        } else if (sub_district) {
            const zip_code = await prisma.thaiLocales.findMany({
                select: {
                    zip_code: true
                },
                where: {
                    subdistrict_name: sub_district as string
                },
                distinct: ["zip_code"],
            });

            res.status(200).json({
                status: 200,
                message: "Get zip code successfully",
                data: zip_code
            });
        } else {
            const provinces = await prisma.thaiLocales.findMany({
                distinct: ["province_name"],
            });

            res.status(200).json({
                status: 200,
                message: "Get all provinces successfully",
                data: provinces
            });
        }
    } catch (error) {
        console.error("Error retrieving locales:", error);
        res.status(500).send("Error retrieving locales");
    }
};

export const getProvinces = async (req: Request, res: Response) => {
    try {
        const provinces = await prisma.thaiProvinces.findMany({
            select: {
                id: true,
                name_th: true,
            }
        })

        if (!provinces) {
            res.status(401).json({
                status: 401,
                message: "Not found provinces"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Get all provinces successfully",
            data: provinces
        });
    } catch (error) {
        console.error("Error retrieving provinces:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving provinces",
        });
    }
}

export const getDistrict = async (req: Request, res: Response) => {
    const { id } = req.query;

    try {
        const districts = await prisma.thaiDistrict.findMany({
            select: {
                id: true,
                name_th: true
            },

            where: {
                province_id: parseInt(id as string),
            }
        });

        if (!districts) {
            res.status(401).json({
                status: 401,
                message: "Not found districts"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Get all districts successfully",
            data: districts
        });
    } catch (error) {
        console.error("Error retrieving districts:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving districts",
        });
    }
}

export const getSubDistrict = async (req: Request, res: Response) => {
    const { id } = req.query;

    try {
        const sub_districts = await prisma.thaiSubDistrict.findMany({
            select: {
                id: true,
                name_th: true
            },

            where: {
                district_id: parseInt(id as string)
            }
        });

        if (!sub_districts) {
            res.status(401).json({
                status: 401,
                message: "Not found sub districts"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Get all sub districts successfully",
            data: sub_districts
        });
    } catch (error) {
        console.error("Error retrieving sub districts:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving sub districts",
        });
    }
}

export const getZipCode = async (req: Request, res: Response) => {
    const { id } = req.query;

    try {
        const zip_code = await prisma.thaiSubDistrict.findFirst({
            select: {
                zip_code: true
            },
            where: {
                id: parseInt(id as string)
            }
        });

        if (!zip_code) {
            return res.status(401).json({
                status: 401,
                message: "Not found zip code"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Get zip code successfully",
            data: zip_code
        });
    } catch (error) {
        console.error("Error retrieving zip code:", error);
        return res.status(500).json({
            status: 500,
            message: "Error retrieving zip code",
        });
    }
};
