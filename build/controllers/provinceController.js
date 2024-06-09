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
exports.getSubDistrict = exports.getDistrict = exports.getProvince = void 0;
const database_1 = __importDefault(require("../database"));
const getProvince = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinces = yield database_1.default.thaiProvinces.findMany({
            select: {
                id: true,
                name_th: true,
                name_en: true,
                geography_id: true,
            },
        });
        res.json(provinces);
    }
    catch (error) {
        console.error('Error retrieving provinces:', error);
        res.status(500).send('Error retrieving provinces');
    }
});
exports.getProvince = getProvince;
const getDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { provinceId } = req.params;
    try {
        const districts = yield database_1.default.thaiDistrict.findMany({
            where: {
                province_id: parseInt(provinceId),
            },
            select: {
                id: true,
                name_th: true,
                name_en: true,
                province_id: true,
            },
        });
        res.json(districts);
    }
    catch (error) {
        console.error('Error retrieving districts:', error);
        res.status(500).send('Error retrieving districts');
    }
});
exports.getDistrict = getDistrict;
const getSubDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { districtId } = req.params;
    try {
        const subDistricts = yield database_1.default.thaiSubDistrict.findMany({
            where: {
                district_id: parseInt(districtId),
            },
            select: {
                id: true,
                name_th: true,
                name_en: true,
                district_id: true,
            },
        });
        res.json(subDistricts);
    }
    catch (error) {
        console.error('Error retrieving subdistricts:', error);
        res.status(500).send('Error retrieving subdistricts');
    }
});
exports.getSubDistrict = getSubDistrict;
