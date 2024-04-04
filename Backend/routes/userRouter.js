import { Router } from "express"
import { getuser, login, logout, register } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(verifyJWT, logout);
router.route("/getuser").get(verifyJWT, getuser);

export default router