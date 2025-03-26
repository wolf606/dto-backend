import express from "express";
import { register, login } from "../controllers/authController";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { Body } from "../middleware/validate-dto";

const router = express.Router();

router.post("/register", Body(CreateUserDto), register);
router.post("/login", Body(LoginUserDto), login);

export default router;
