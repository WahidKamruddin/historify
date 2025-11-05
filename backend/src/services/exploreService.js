import axios from "axios";

export async function fetchHistoricalPlaces(lat, lng) {
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

  const { data } = await axios.get(url, {
    params: {
      location: `${lat},${lng}`,
      radius: 5000,
      type: "museum|historic|point_of_interest|tourist_attraction",
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  return data.results.map(place => ({
    place_id: place.place_id,
    name: place.name,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
    address: place.vicinity,
  }));
}
