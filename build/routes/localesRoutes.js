"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localesController_1 = require("../controllers/localesController");
const router = (0, express_1.Router)();
router.get("/provinces", localesController_1.getProvinces);
router.get("/districts", localesController_1.getDistrict);
router.get("/sub_districts", localesController_1.getSubDistrict);
router.get("/zipcode", localesController_1.getZipCode);
exports.default = router;
