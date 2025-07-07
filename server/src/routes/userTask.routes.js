import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createTask,
    getUserTasks,
    toggleTaskStatus,
    deleteTask
} from "../controllers/userTask.controller.js";

const router = Router();

router.route("/tasks").get(verifyJWT, getUserTasks);
router.route("/tasks").post(verifyJWT, createTask);
router.route("/tasks/:id/toggle").patch(verifyJWT, toggleTaskStatus);
router.route("/tasks/:id").delete(verifyJWT, deleteTask);

export default router;
