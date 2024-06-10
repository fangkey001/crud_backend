import { Request, Response } from "express";
import prisma from "../database";
import { Prisma } from "@prisma/client";

export const getAllPersons = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const search = req.query.search as string || "";
        let sort = req.query.sort as string || "created_at";
        const sortDir = req.query.direction as string || "DESC";

        if (sort === "address") {
            sort = "province_id";
        } else if (sort === "name") {
            sort = "first_name";
        }

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const where: any = {
            OR: [
                { first_name: { contains: search, mode: 'insensitive' } },
                { middle_name: { contains: search, mode: 'insensitive' } },
                { last_name: { contains: search, mode: 'insensitive' } },
            ],
        };

        const persons = await prisma.person.findMany({
            skip: skip,
            take: take,
            where: where,
            orderBy: {
                [sort]: sortDir,
            },
            include: {
                province: {
                    select: {
                        name_th: true,
                    },
                },
                district: {
                    select: {
                        name_th: true,
                    },
                },
                subDistrict: {
                    select: {
                        name_th: true,
                    },
                },
            },
        });

        const totalRecords = await prisma.person.count({ where: where });
        const totalPages = Math.ceil(totalRecords / pageSize);
        const formattedPersons = persons.map(person => ({
            ...person,
            province: person.province?.name_th,
            district: person.district?.name_th,
            subDistrict: person.subDistrict?.name_th
        }));

        res.status(200).json({
            status: 200,
            message: "Get all persons successfully",
            data: {
                totalPages: totalPages,
                data: formattedPersons
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

export const getByPerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const byPerson = await prisma.person.findFirst({
            where: {
                id: Number(id),
            }
        })

        res.status(200).json({
            status: 200,
            message: "Get person successfully",
            data: byPerson
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

export const createPerson = async (req: Request, res: Response) => {
    const {
        first_name, middle_name, last_name, gender, birth_date, age,
        address, sub_district_id, district_id, province_id, zip_code,
        id_card, expire_id_card
    } = req.body;

    try {
        const existingPerson = await prisma.person.findUnique({
            where: {
                id_card: id_card,
            },
        });

        if (existingPerson) {
            return res.status(409).json({
                status: 409,
                message: "เลขบัตรประชาชนถูกใช้งานไปแล้ว",
            });
        }

        const person = await prisma.person.create({
            data: {
                first_name,
                middle_name,
                last_name,
                gender,
                birth_date: new Date(birth_date),
                age,
                address,
                subDistrict: {
                    connect: { id: Number(sub_district_id) }
                },
                district: {
                    connect: { id: Number(district_id) }
                },
                province: {
                    connect: { id: Number(province_id) }
                },
                zip_code,
                id_card,
                expire_id_card: new Date(expire_id_card)
            }
        });

        res.status(200).json({
            status: 200,
            message: "สร้างข้อมูลสำเร็จ",
            data: person,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "ไม่สามารถติดต่อกับเซิฟเวอร์ได้",
        });
    }
};

export const deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedPerson = await prisma.person.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({
            status: 200,
            message: "Deleted person successfully",
            data: deletedPerson,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

export const updatePerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        first_name, middle_name, last_name, gender, birth_date, age,
        address, sub_district_id, district_id, province_id, zip_code,
        id_card, expire_id_card
    } = req.body;

    try {
        const updatedPerson = await prisma.person.update({
            where: { id: Number(id) },
            data: {
                first_name,
                middle_name,
                last_name,
                gender,
                birth_date: new Date(birth_date),
                age,
                address,
                subDistrict: {
                    connect: { id: Number(sub_district_id) }
                },
                district: {
                    connect: { id: Number(district_id) }
                },
                province: {
                    connect: { id: Number(province_id) }
                },
                zip_code,
                id_card,
                expire_id_card: new Date(expire_id_card)
            }
        });

        res.status(200).json({
            status: 200,
            message: "Updated person successfully",
            data: updatedPerson,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};
