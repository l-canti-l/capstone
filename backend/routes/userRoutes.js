import express from "express";
import {
  getProfile,
  authenticateUser,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import { protection } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protection, getProfile)
  .put(protection, updateProfile);
router.route("/").post(registerUser);

export default router;
