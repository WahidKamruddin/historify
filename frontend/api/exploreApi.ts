// src/services/exploreApi.ts
export async function getNearbyPlaces(lat: number, lng: number) {
    try {
      const response = await fetch(`http://localhost:3001/api/explore?lat=${lat}&lng=${lng}`);
      if (!response.ok) throw new Error("Failed to fetch places");
      return response.json();
    } catch (err: any) {
      console.error(err);
      return [];
    }
  }
  