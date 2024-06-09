"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localesController_1 = require("../controllers/localesController");
const router = (0, express_1.Router)();
router.get("/", localesController_1.getLocales);
exports.default = router;
