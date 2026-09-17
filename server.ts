import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// A robust list of cataloged extinct animals for fuzzy search and auto-suggestions
const EXTINCT_CATALOG = [
  { name: "Dodo", type: "Bird", period: "Holocene (Extinct ~1662)" },
  { name: "Tyrannosaurus Rex", type: "Dinosaur", period: "Late Cretaceous (~66 Ma)" },
  { name: "Woolly Mammoth", type: "Mammal", period: "Pleistocene-Holocene (~4,000 years ago)" },
  { name: "Saber-Toothed Tiger", type: "Mammal", period: "Pleistocene (~10,000 years ago)" },
  { name: "Tasmanian Tiger", type: "Mammal", period: "Modern Era (Extinct 1936)" },
  { name: "Moa", type: "Bird", period: "Holocene (Extinct ~1440s)" },
  { name: "Quagga", type: "Mammal", period: "Modern Era (Extinct 1883)" },
  { name: "Passenger Pigeon", type: "Bird", period: "Modern Era (Extinct 1914)" },
  { name: "Great Auk", type: "Bird", period: "Modern Era (Extinct 1844)" },
  { name: "Thylacine", type: "Mammal", period: "Modern Era (Extinct 1936)" },
  { name: "Steller's Sea Cow", type: "Mammal", period: "Modern Era (Extinct 1768)" },
  { name: "Megalodon", type: "Fish / Shark", period: "Miocene to Pliocene (~3.6 Ma)" },
  { name: "Woolly Rhinoceros", type: "Mammal", period: "Late Pleistocene (~14,000 years ago)" },
  { name: "Triceratops", type: "Dinosaur", period: "Late Cretaceous (~66 Ma)" },
  { name: "Velociraptor", type: "Dinosaur", period: "Late Cretaceous (~71 Ma)" },
  { name: "Irish Elk", type: "Mammal", period: "Late Pleistocene (~7,700 years ago)" },
  { name: "Elephant Bird", type: "Bird", period: "Holocene (Extinct ~1000-1200 AD)" },
  { name: "Golden Toad", type: "Amphibian", period: "Modern Era (Extinct 1989)" },
  { name: "Pyrenean Ibex", type: "Mammal", period: "Modern Era (Extinct 2000)" },
  { name: "Baiji Dolphin", type: "Mammal", period: "Modern Era (Extinct ~2006)" }
];

// 1. Suggestions endpoint (supports autocomplete / fuzzy lookup / AI correction)
app.get("/api/suggestions", async (req: Request, res: Response) => {
  const query = (req.query.q || "").toString().trim().toLowerCase();
  if (!query) {
    return res.json(EXTINCT_CATALOG.slice(0, 5));
  }

  // Find exact starts-with or contains
  const matches = EXTINCT_CATALOG.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    return res.json(matches.slice(0, 6));
  }

  // If no match, let's use Gemini to spell-correct or suggest matching extinct animals
  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `The user typed a search query "${query}" seeking an extinct animal. It might have spelling errors. Provide a list of up to 3 closest extinct animal names that match this intent.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              period: { type: Type.STRING }
            },
            required: ["name", "type", "period"]
          }
        }
      }
    });

    const suggestions = JSON.parse(aiResponse.text || "[]");
    return res.json(suggestions);
  } catch (error) {
    console.error("AI suggestion error:", error);
    return res.json([]);
  }
});

// 1.5 Chatbot endpoint (provides conversation about paleontology & extinction)
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, language, history } = req.body;
  const lang = (language || "en") as "en" | "hi" | "bn";
  const userMessage = (message || "").toString().trim();

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const langName = lang === "hi" ? "Hindi (हिन्दी)" : lang === "bn" ? "Bengali (বাংলা)" : "English";

  const systemInstruction = `
You are the "Interstellar Paleontologist AI" - an extremely knowledgeable, warm, engaging, and friendly expert in extinct species, Earth's geological history, and nature conservation.
You guide users through Earth's grand history.

Current Language Preference: ${langName}.
- You MUST answer the user's message strictly in ${langName}. Use authentic terminology, native greetings, and correct grammar.
- Keep your answers highly captivating, easy to read, with paragraphs, bullet points, and elegant lists when appropriate.
- Focus strictly on paleontology, extinct animals, causes of extinction (like climate change, asteroid impacts, human activities), evolution, fossils, and conservation lessons.
- If the user asks general irrelevant questions outside of paleontology/extinction, politely guide them back to exploring extinct animals.
  `;

  try {
    // Format conversation history for Gemini
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    // Append current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const chatResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    });

    const replyText = chatResponse.text || "Sorry, I could not synthesize a response. Let's try again.";
    return res.json({ text: replyText });
  } catch (error) {
    console.error("AI Chatbot error:", error);
    const errReply = lang === "hi" 
      ? "क्षमा करें, मैं प्रतिक्रिया उत्पन्न नहीं कर सका। कृपया पुनः प्रयास करें।"
      : lang === "bn"
      ? "দুঃখিত, আমি উত্তর তৈরি করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।"
      : "Sorry, I encountered an issue speaking with the paleontology mainframe. Please try again.";
    return res.json({ text: errReply });
  }
});

// Helper function to search Wikipedia & Wikidata & Commons
async function fetchWikipediaData(animalName: string) {
  try {
    // 1. Search english wikipedia to locate correct page title
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(animalName + " extinct")}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const searchResults = searchData.query?.search || [];
    if (searchResults.length === 0) return null;

    const topTitle = searchResults[0].title;

    // 2. Fetch page summary extract and original image
    const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&titles=${encodeURIComponent(topTitle)}&piprop=original&format=json&origin=*`;
    const extractRes = await fetch(extractUrl);
    const extractData = await extractRes.json();

    const pages = extractData.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    const textExtract = page?.extract || "";
    const mainImage = page?.original?.source || null;

    // 3. Search Wikimedia Commons for additional images
    const galleryImages: string[] = [];
    if (mainImage) galleryImages.push(mainImage);

    try {
      const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(topTitle + " extinct reconstruction")}&gsrnamespace=6&prop=imageinfo&iiprop=url&gsrlimit=5&format=json&origin=*`;
      const commonsRes = await fetch(commonsUrl);
      const commonsData = await commonsRes.json();
      const commonsPages = commonsData.query?.pages || {};

      for (const cid of Object.keys(commonsPages)) {
        const cpage = commonsPages[cid];
        const url = cpage.imageinfo?.[0]?.url;
        if (url && url !== mainImage && !galleryImages.includes(url)) {
          galleryImages.push(url);
        }
      }
    } catch (e) {
      console.warn("Wikimedia Commons fetch skipped/failed:", e);
    }

    return {
      title: topTitle,
      extract: textExtract,
      galleryImages: galleryImages.slice(0, 4),
      sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(topTitle)}`
    };
  } catch (error) {
    console.error("Wikipedia/Wikimedia fetch error:", error);
    return null;
  }
}

// 2. Search & Generate complete Wikipedia-style structured article with Gemini
app.post("/api/search", async (req: Request, res: Response) => {
  const { query, language } = req.body;
  const lang = (language || "en") as "en" | "hi" | "bn";

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query is required" });
  }

  const animalName = query.trim();

  // Try fetching raw wiki data
  const wikiData = await fetchWikipediaData(animalName);

  // Define language context
  const langName = lang === "hi" ? "Hindi (हिन्दी)" : lang === "bn" ? "Bengali (বাংলা)" : "English";

  // Build the system prompt
  const systemPrompt = `
You are an expert Museum-grade Paleontologist, Wikipedia Knowledge Architect, and Multilingual Translator.
Synthesize an exhaustive, beautiful, scientifically accurate, Wikipedia-style encyclopedia entry for the extinct animal: "${animalName}".

Language requirements:
- Return all user-facing strings (such as commonName, habitat, diet, lifespan, size, weight, timePeriod, geographicDistribution, causeOfExtinction, discoveryHistory, fossilEvidence, interestingFacts, timeline events, conservationLessons, relatedSpecies descriptions, and summary) strictly in the language: ${langName}.
- Keep common names familiar to that language.
- Keep the scientificName in its accurate Latin form (e.g. "Raphus cucullatus" for Dodo).

If Wikipedia context is available, use it as a foundational reference but expand it with your extensive historical knowledge to fulfill all schema properties.
Wikipedia context:
${wikiData ? `Title: ${wikiData.title}\nExtract: ${wikiData.extract}` : "No specific Wikipedia article text found. Generate a high-fidelity encyclopedic entry based on authentic scientific records."}
  `;

  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the complete structured extinct animal record.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            kingdom: { type: Type.STRING },
            phylum: { type: Type.STRING },
            class: { type: Type.STRING },
            order: { type: Type.STRING },
            family: { type: Type.STRING },
            habitat: { type: Type.STRING },
            diet: { type: Type.STRING },
            lifespan: { type: Type.STRING },
            size: { type: Type.STRING },
            weight: { type: Type.STRING },
            timePeriod: { type: Type.STRING },
            geographicDistribution: { type: Type.STRING },
            extinctionDate: { type: Type.STRING },
            causeOfExtinction: { type: Type.STRING },
            discoveryHistory: { type: Type.STRING },
            fossilEvidence: { type: Type.STRING },
            interestingFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.STRING },
                  event: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["year", "event", "description"]
              }
            },
            conservationLessons: { type: Type.STRING },
            relatedSpecies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              }
            },
            summary: { type: Type.STRING, description: "A highly captivating 2-3 sentence overview of this animal in the requested language, optimized for Text-to-Speech playback." }
          },
          required: [
            "commonName", "scientificName", "kingdom", "phylum", "class", "order", "family",
            "habitat", "diet", "lifespan", "size", "weight", "timePeriod", "geographicDistribution",
            "extinctionDate", "causeOfExtinction", "discoveryHistory", "fossilEvidence", "interestingFacts",
            "timeline", "conservationLessons", "relatedSpecies", "summary"
          ]
        }
      }
    });

    const animalRecord = JSON.parse(aiResponse.text || "{}");

    // Add search images from wiki data or elegant visual placeholders
    let images: string[] = wikiData?.galleryImages || [];
    if (images.length === 0) {
      // High-quality public domain museum placeholders for extinct animals
      images = [
        "https://images.unsplash.com/photo-1574158622643-69d34d72650a?q=80&w=1000&auto=format&fit=crop", // Museum vibe
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop"
      ];
    }

    animalRecord.images = images;
    animalRecord.sourceUrl = wikiData?.sourceUrl || `https://en.wikipedia.org/wiki/Extinction`;

    return res.json(animalRecord);
  } catch (error) {
    console.error("Gemini classification/synthesis failed:", error);
    return res.status(500).json({ error: "Could not generate animal record" });
  }
});

// Start dev server if we are not in production, otherwise serve built static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
