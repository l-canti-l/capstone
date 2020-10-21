import express from "express";
import { authorizeUser } from '../controllers/userController.js'


const router = express.Router();

router.post('/login', authorizeUser)

export default router;


