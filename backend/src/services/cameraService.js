import { GoogleGenAI } from "@google/genai";

//takes in image as base64 encoded strings, lat and longitute
export async function fetchFrameInformation(image, lat, lng) {
  const ai = new GoogleGenAI({});

  const contents = [
    {
        inlineData: {
            mimeType: "image/jpeg",
            data: image,
        },
    },
    {text: `What is this image? The location of this image is ${lat}, ${lng}. Please state the historical relevancy of this image and make sure to fact check using sources in less than 50 words.`}
  ];

  console.log("sending to gemeni");
  
  const response = await ai.models.generateContent({
    model: "gemeni-2.5-flash",
    contents: contents,
  });

  return response.text;
}
