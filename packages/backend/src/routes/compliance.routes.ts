import { Router } from "express";
import { checkCompliance } from "../controllers/compliance.controller";

const router: Router = Router();

router.post("/check", checkCompliance);

export default router;
