import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
const router = Router();
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 20 * 60 * 1000,
  max: 20,
  message: { msg: "IP rate limit exceeded, retry in 20 minutes" },
});

router.route("/register").post(apiLimiter, validateRegisterInput, register);
router.route("/login").post(apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
