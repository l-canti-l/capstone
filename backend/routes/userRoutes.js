import express from "express";
import { getProfile, authenticateUser, registerUser } from '../controllers/userController.js'
import { protection } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', authenticateUser)
router.route('/profile').get(protection, getProfile)
router.route('/').post(registerUser)

export default router;


