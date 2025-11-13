// src/api/cameraApi.ts

export async function getFrameInformation(image: string, lat: number, lng: number): Promise<string> {
    // image is already a base64 string from takeScreenshot, no need to read from filesystem
    try {
      console.log("image to api")
      const response = await fetch(`http://192.168.1.206:3001/api/camera`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          lat,
          lng,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch frame information");
      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error(err);
      return " ";
    }
  }
  

  