"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provinceController_1 = require("../controllers/provinceController");
const router = (0, express_1.Router)();
router.get("/", provinceController_1.getProvince);
router.get("/:provinceId/districts", provinceController_1.getDistrict);
router.get("/:districtId/subdistricts", provinceController_1.getSubDistrict);
exports.default = router;
