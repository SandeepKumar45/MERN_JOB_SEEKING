import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJob } from "../controllers/job.controller.js"

const router = Router()
router.route("/getall").get(getAllJobs)
router.route("/post").post(verifyJWT, postJob)
router.route("/getmyjobs").get(verifyJWT, getMyJobs)
router.route("/updatejob/:id").put(verifyJWT, updateJob)
router.route("/deletejob/:id").delete(verifyJWT, deleteJob)
router.route("/:id").get(verifyJWT, getSingleJob)

export default router