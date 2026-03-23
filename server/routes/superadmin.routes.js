import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import {
    getDashboardStats,
    getAllCompanies,
    getAllRecruiters,
    getAllCandidates
} from "../controllers/superadmin.controller.js";

const router = express.Router();

router.route("/stats").get(isAuthenticated, isSuperAdmin, getDashboardStats);
router.route("/companies").get(isAuthenticated, isSuperAdmin, getAllCompanies);
router.route("/recruiters").get(isAuthenticated, isSuperAdmin, getAllRecruiters);
router.route("/candidates").get(isAuthenticated, isSuperAdmin, getAllCandidates);

export default router;
