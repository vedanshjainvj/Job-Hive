import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";

// Get dashboard statistics
export const getDashboardStats = asyncError(async (req, res, next) => {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const pendingApplications = await Application.countDocuments({ status: "pending" });
    const acceptedApplications = await Application.countDocuments({ status: "accepted" });
    const rejectedApplications = await Application.countDocuments({ status: "rejected" });

    // Monthly registrations for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                    role: "$role"
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const monthlyJobs = await Job.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    return res.status(200).json({
        success: true,
        stats: {
            totalStudents,
            totalRecruiters,
            totalCompanies,
            totalJobs,
            totalApplications,
            applicationStatus: { pending: pendingApplications, accepted: acceptedApplications, rejected: rejectedApplications },
            monthlyUsers,
            monthlyJobs
        }
    });
});

// Get all companies
export const getAllCompanies = asyncError(async (req, res, next) => {
    const companies = await Company.find().populate("userId", "fullname email").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, companies });
});

// Get all recruiters
export const getAllRecruiters = asyncError(async (req, res, next) => {
    const recruiters = await User.find({ role: "recruiter" }).select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, recruiters });
});

// Get all candidates
export const getAllCandidates = asyncError(async (req, res, next) => {
    const candidates = await User.find({ role: "student" }).select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, candidates });
});
