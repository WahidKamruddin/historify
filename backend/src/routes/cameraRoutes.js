import { Router } from "express";
import { getFrameInformation } from "../controllers/cameraController.js";

const router = Router();

// Route maps HTTP POST /api/camera to the controller function
router.post("/", getFrameInformation);

export default router;
