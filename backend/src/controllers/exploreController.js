import * as exploreService from "../services/exploreService.js";

/**
 * Controller for the Explore page.
 * Handles GET /api/explore?lat=..&lng=..
 */
export async function getNearbyHistoricalPlaces(req, res) {
  const { lat, lng } = req.query;

  // Validate query parameters
  if (!lat || !lng) {
    return res.status(400).json({ error: "Coordinates (lat & lng) are required" });
  }

  try {
    // Call service to fetch data
    const places = await exploreService.fetchHistoricalPlaces(
      Number(lat),
      Number(lng)
    );

    // Send JSON response
    res.json(places);
  } catch (err) {
    console.error("Error in controller:", err.message);
    res.status(500).json({ error: "Failed to fetch historical places" });
  }
}
