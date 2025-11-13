import * as cameraService from "../services/cameraService.js";

/**
 * Controller for the camera page.
 * Handles POST /api/camera with { image, lat, lng } in request body
 */
export async function getFrameInformation(req, res) {

  console.log("received");

  const { image, lat, lng } = req.body;

  // Validate request body parameters
  if (!lat || !lng) return res.status(400).json({ error: "Coordinates (lat & lng) are required" });
  

  if (!image) return res.status(400).json({ error: "Image is required" });
  

  try {
    // Call service to fetch data
    const frameInformation = await cameraService.fetchFrameInformation(
        image,
        Number(lat),
        Number(lng)
    );

    // Send JSON response
    res.json(frameInformation);
  } catch (err) {
    console.error("Error in controller:", err.message);
    res.status(500).json({ error: "Failed to fetch frame information" });
  }
}
