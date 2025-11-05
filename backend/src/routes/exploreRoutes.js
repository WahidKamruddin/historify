import { Router } from "express";
import { getNearbyHistoricalPlaces } from "../controllers/exploreController.js";

const router = Router();

// Route maps HTTP GET /api/explore to the controller function
router.get("/", getNearbyHistoricalPlaces);

export default router;
