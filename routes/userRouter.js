import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
const router = Router();

router.route("/current-user").get(getCurrentUser);
router.route("/admin/app-stats").get(getApplicationStats);
router.get("/update-user", validateUpdateUserInput, updateUser);

export default router;
