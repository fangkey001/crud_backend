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
exports.getLocales = void 0;
const database_1 = __importDefault(require("../database"));
const getLocales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, zipcode } = req.query;
    try {
        let locales;
        if (!search && !zipcode) {
            locales = yield database_1.default.thaiLocales.findMany();
        }
        else if (search && zipcode) {
            locales = yield database_1.default.thaiLocales.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                { province_name: { contains: search } },
                                { district_name: { contains: search } },
                                { subdistrict_name: { contains: search } },
                            ],
                        },
                        {
                            zip_code: {
                                equals: parseInt(zipcode),
                            },
                        },
                    ],
                },
            });
        }
        else {
            locales = yield database_1.default.thaiLocales.findMany({
                where: {
                    OR: [
                        { province_name: { contains: search || "" } },
                        { district_name: { contains: search || "" } },
                        { subdistrict_name: { contains: search || "" } },
                        {
                            zip_code: zipcode ? { equals: parseInt(zipcode) } : undefined,
                        },
                    ],
                },
            });
        }
        res.json(locales);
    }
    catch (error) {
        console.error('Error retrieving locales:', error);
        res.status(500).send('Error retrieving locales');
    }
});
exports.getLocales = getLocales;
