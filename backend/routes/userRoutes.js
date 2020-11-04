import express from "express";
import {
  getProfile,
  authenticateUser,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protection, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protection, admin, getUsers);
router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protection, getProfile)
  .put(protection, updateProfile);
router
  .route("/:id")
  .delete(protection, admin, deleteUser)
  .get(protection, admin, getUserById)
  .put(protection, admin, updateUser);

export default router;
