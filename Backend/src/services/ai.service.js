require("dotenv").config()
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
   apiKey: "AIzaSyDFx541NBT9dNuy0KYWoLqgR610-9jcduA"
});

async function captionGeneration(base64ImageFile){

  const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
      systemInstruction: `
      You are an expert in generating captions for images.
      You generate single line captions.
      Your captions should be small and concise.
      You use emojis and hashtag in caption
      The caption should be in dark humor
      You doesn't use the hashtag #darkhumor
      `,
    },
});
return response.text

}

module.exports = captionGeneration