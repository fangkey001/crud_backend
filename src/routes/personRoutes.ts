import { Router } from 'express';
import {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePerson,
    getByPerson
} from '../controllers/personController';

const router = Router();

router.get("/", getAllPersons);
router.get("/:id", getByPerson);
router.post("/", createPerson);
router.delete("/:id", deletePerson);
router.put("/:id", updatePerson);

export default router;