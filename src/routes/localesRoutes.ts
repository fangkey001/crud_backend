import { Router } from 'express';
import { getDistrict, getProvinces, getSubDistrict, getZipCode } from '../controllers/localesController';

const router = Router();

router.get("/provinces", getProvinces);
router.get("/districts", getDistrict);
router.get("/sub_districts", getSubDistrict);
router.get("/zipcode", getZipCode);

export default router;