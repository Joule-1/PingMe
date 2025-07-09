import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = Router();

router.route("/dashboard").get(verifyJWT, getDashboardStats);

export default router;
