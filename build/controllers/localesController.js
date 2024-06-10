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
exports.getZipCode = exports.getSubDistrict = exports.getDistrict = exports.getProvinces = exports.getLocales = void 0;
const database_1 = __importDefault(require("../database"));
const getLocales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { province, district, sub_district } = req.query;
    try {
        if (province) {
            const districts = yield database_1.default.thaiLocales.findMany({
                select: {
                    district_name: true
                },
                where: {
                    province_name: province
                },
                distinct: ["district_name"],
            });
            res.status(200).json({
                status: 200,
                message: "Get all districts successfully",
                data: districts
            });
        }
        else if (district) {
            const sub_districts = yield database_1.default.thaiLocales.findMany({
                select: {
                    subdistrict_name: true
                },
                where: {
                    district_name: district
                },
                distinct: ["subdistrict_name"],
            });
            res.status(200).json({
                status: 200,
                message: "Get all sub districts successfully",
                data: sub_districts
            });
        }
        else if (sub_district) {
            const zip_code = yield database_1.default.thaiLocales.findMany({
                select: {
                    zip_code: true
                },
                where: {
                    subdistrict_name: sub_district
                },
                distinct: ["zip_code"],
            });
            res.status(200).json({
                status: 200,
                message: "Get zip code successfully",
                data: zip_code
            });
        }
        else {
            const provinces = yield database_1.default.thaiLocales.findMany({
                distinct: ["province_name"],
            });
            res.status(200).json({
                status: 200,
                message: "Get all provinces successfully",
                data: provinces
            });
        }
    }
    catch (error) {
        console.error("Error retrieving locales:", error);
        res.status(500).send("Error retrieving locales");
    }
});
exports.getLocales = getLocales;
const getProvinces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinces = yield database_1.default.thaiProvinces.findMany({
            select: {
                id: true,
                name_th: true,
            }
        });
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
    }
    catch (error) {
        console.error("Error retrieving provinces:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving provinces",
        });
    }
});
exports.getProvinces = getProvinces;
const getDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const districts = yield database_1.default.thaiDistrict.findMany({
            select: {
                id: true,
                name_th: true
            },
            where: {
                province_id: parseInt(id),
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
    }
    catch (error) {
        console.error("Error retrieving districts:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving districts",
        });
    }
});
exports.getDistrict = getDistrict;
const getSubDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const sub_districts = yield database_1.default.thaiSubDistrict.findMany({
            select: {
                id: true,
                name_th: true
            },
            where: {
                district_id: parseInt(id)
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
    }
    catch (error) {
        console.error("Error retrieving sub districts:", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving sub districts",
        });
    }
});
exports.getSubDistrict = getSubDistrict;
const getZipCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const zip_code = yield database_1.default.thaiSubDistrict.findFirst({
            select: {
                zip_code: true
            },
            where: {
                id: parseInt(id)
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
    }
    catch (error) {
        console.error("Error retrieving zip code:", error);
        return res.status(500).json({
            status: 500,
            message: "Error retrieving zip code",
        });
    }
});
exports.getZipCode = getZipCode;
