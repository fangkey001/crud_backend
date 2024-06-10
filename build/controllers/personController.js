"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerson = exports.deletePerson = exports.createPerson = exports.getByPerson = exports.getAllPersons = void 0;
const database_1 = __importDefault(require("../database"));
const getAllPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const search = req.query.search || "";
        let sort = req.query.sort || "created_at";
        const sortDir = req.query.direction || "DESC";
        if (sort === "address") {
            sort = "province_id";
        }
        else if (sort === "name") {
            sort = "first_name";
        }
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const where = {
            OR: [
                { first_name: { contains: search, mode: 'insensitive' } },
                { middle_name: { contains: search, mode: 'insensitive' } },
                { last_name: { contains: search, mode: 'insensitive' } },
            ],
        };
        const persons = yield database_1.default.person.findMany({
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
        const totalRecords = yield database_1.default.person.count({ where: where });
        const totalPages = Math.ceil(totalRecords / pageSize);
        const formattedPersons = persons.map(person => {
            var _a, _b, _c;
            return (Object.assign(Object.assign({}, person), { province: (_a = person.province) === null || _a === void 0 ? void 0 : _a.name_th, district: (_b = person.district) === null || _b === void 0 ? void 0 : _b.name_th, subDistrict: (_c = person.subDistrict) === null || _c === void 0 ? void 0 : _c.name_th }));
        });
        res.status(200).json({
            status: 200,
            message: "Get all person successfully",
            data: {
                totalPages: totalPages,
                data: formattedPersons
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});
exports.getAllPersons = getAllPersons;
const getByPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const byPerson = yield database_1.default.person.findFirst({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json({
            status: 200,
            message: "Get person successfully",
            data: byPerson
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});
exports.getByPerson = getByPerson;
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, middle_name, last_name, gender, birth_date, age, address, sub_district_id, district_id, province_id, zip_code, id_card, expire_id_card } = req.body;
    try {
        const existingPerson = yield database_1.default.person.findUnique({
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
        const person = yield database_1.default.person.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "ไม่สามารถติดต่อกับเซิฟเวอร์ได้",
        });
    }
});
exports.createPerson = createPerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPerson = yield database_1.default.person.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({
            status: 200,
            message: "Deleted person successfully",
            data: deletedPerson,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});
exports.deletePerson = deletePerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { first_name, middle_name, last_name, gender, birth_date, age, address, sub_district_id, district_id, province_id, zip_code, id_card, expire_id_card } = req.body;
    try {
        const updatedPerson = yield database_1.default.person.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});
exports.updatePerson = updatePerson;
