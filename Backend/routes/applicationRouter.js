import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { employerGetAllApplication, jobseekerDeleteApplication, jobseekerGetAllApplication, postApplication } from "../controllers/application.controller.js"

const router = Router()
router.route("/post").post(verifyJWT,postApplication)
router.route("/employer/getall").get(verifyJWT,employerGetAllApplication)
router.route("/jobseeker/getall").get(verifyJWT,jobseekerGetAllApplication)
router.route("/delete/:id").delete(verifyJWT,jobseekerDeleteApplication)

export default router