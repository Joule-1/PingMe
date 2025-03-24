import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    authenticateUser,
    changeCurrentPassword,
} from "../controllers/user.controller.js";
import secureTime from "../controllers/secureTime.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("userImage"), registerUser);

router.route("/login").post(loginUser);

// Secure Time Route
router.route("/secure-time").get(secureTime);

// Secure Routes
router.route("/authenticate-user").post(verifyJWT, authenticateUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

export default router;
