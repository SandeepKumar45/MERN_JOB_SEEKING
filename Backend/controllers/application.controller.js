import { Application } from "../models/application.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudnary.js";


export const postApplication = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400)
        .json(new ApiResponse(400,null,"Employer is not allowed to access this option"))
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Resume file required!"))
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Invalid file type. Please upload a png file,jpeg file or webp file"))
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    if (!name || !email || !coverLetter || !phone || !address || !jobId) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Please fill all fields"))
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Jon not found!"))
    }

    if (jobDetails.expired === true) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job expired!"))
    }

    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };

    // check if already appplied
    const applied = await Application.findOne({ $and: [{ applicantID }, { employerID }] })
    if (applied) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Already Applied"))
    }

    const cloudinaryResponse = await uploadToCloudinary(resume.tempFilePath)

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return res.status(500)
        .json(new ApiResponse(500,null,"Failed to upload Resume to Cloudinary"))
    }

    try {
        const application = await Application.create({
            name,
            email,
            coverLetter,
            phone,
            address,
            applicantID,
            employerID,
            resume: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        })
    
        res.status(200)
        .json(new ApiResponse(200,application,"Application Submitted!"))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const employerGetAllApplication = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job Seeker not allowed to access this option."))
    }

    const { _id } = req.user
    const applications = await Application.find({ "employerID.user": _id })

    return res.status(200)
        .json(new ApiResponse(200, applications))
})

export const jobseekerGetAllApplication = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400)
        .json(new ApiResponse(400,null,"Employer not allowed to access this option."))
    }

    const { _id } = req.user
    const applications = await Application.find({ "applicantID.user": _id })

    return res.status(200)
        .json(new ApiResponse(200, applications))
})

export const jobseekerDeleteApplication = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400)
        .json(new ApiResponse(400,null,"Employer not allowed to access this option."))
    }

    const { id } = req.params;
    const application = await Application.findById(id)
    if (!application) {
        return res.status(404)
        .json(new ApiResponse(404,null,"Application not found!"))
    }

    if (application.applicantID.user.toString() !== req.user._id.toString()) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Cannot delete other's application"))
    }

    await application.deleteOne()
    await deleteFromCloudinary(application.resume.public_id)
    return res.status(200)
        .json(new ApiResponse(200, {}, "Application Deleted"))
})