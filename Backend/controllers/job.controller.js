import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({ expired: false })
    
        return res.status(200)
            .json(
                new ApiResponse(200, jobs))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const postJob = asyncHandler(async (req, res) => {
    const { role } = req.user
    if (role === 'Job Seeker') {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job Seeker is not allowed to access this option"))
    }

    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body
    
    if (!title || !description || !category || !country || !city || !location) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Please provide full job details."))
    }

    if (!fixedSalary && (!salaryFrom || !salaryTo)) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Please either provide fixed salary or ranged salary."))
    }

    if (fixedSalary && salaryFrom && salaryTo) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Cannot Enter Fixed and Ranged Salary together."))
    }

    const postedBy = req.user._id

    try {
        const job = await Job.create({
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo,
            postedBy,
        })

        return res.status(200)
        .json(new ApiResponse(200, job, "Job Posted Successfully"))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const getMyJobs = asyncHandler(async (req, res) => {
    const { role } = req.user
    if (role === 'Job Seeker') {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job Seeker is not allowed to access this option"))
    }

    try {
        const myJobs = await Job.find({ postedBy: req.user._id })
    
        return res.status(200)
            .json(new ApiResponse(200, myJobs))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const updateJob = asyncHandler(async (req, res) => {
    const { role } = req.user
    if (role === 'Job Seeker') {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job Seeker not allowed to access this option."))
    }

    const { id } = req.params
    let job = await Job.findById(id)
    if (!job) {
        return res.status(404)
        .json(new ApiResponse(404,null,"OOPS! Job not found"))
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Cannot access job that is not posted by you"))
    }

    try {
        job = await Job.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
    
        return res.status(200)
        .json(new ApiResponse(200,job,"Job Updated Successfully!"))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const deleteJob = asyncHandler(async (req,res) => {
    const { role } = req.user
    if (role === 'Job Seeker') {
        return res.status(400)
        .json(new ApiResponse(400,null,"Job Seeker not allowed to access this option."))
    }

    const { id } = req.params
    let job = await Job.findById(id)
    if (!job) {
        return res.status(404)
        .json(new ApiResponse(404,null,"OOPS! Job not found"))
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Cannot access job that is not posted by you"))
    }

    try {
        await job.deleteOne()
        return res.status(200)
        .json(new ApiResponse(200,{},"Job Deleted!"))
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }
})

export const getSingleJob = asyncHandler(async (req,res) => {
    const { id } = req.params
        const job = await Job.findById(id)
        if (!job) {
            return res.status(404)
        .json(new ApiResponse(404,null,"Job not found!"))
        }
        res.status(200)
        .json(new ApiResponse(200,job))

})