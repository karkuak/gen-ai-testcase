import { GoogleGenAI, Type } from "@google/genai";
import type { UseCase } from '../types';

// Fix: Adhered to the coding guidelines by using `process.env.API_KEY` directly
// for the Gemini API client initialization. The API key is assumed to be
// available in the execution environment. This also resolves the TypeScript error
// `Property 'env' does not exist on type 'ImportMeta'`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const testScenarioSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the test scenario, e.g., 'TS-001'." },
        title: { type: Type.STRING, description: "A descriptive title for the test scenario." },
        type: { type: Type.STRING, description: "The type of test: 'Positive', 'Negative', or 'Edge Case'." },
        steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of strings describing the sequential steps to perform the test."
        },
        expectedResult: { type: Type.STRING, description: "The expected outcome after performing the steps." },
    },
    required: ["id", "title", "type", "steps", "expectedResult"]
};

const useCaseSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the use case, e.g., 'UC-01'." },
        title: { type: Type.STRING, description: "A high-level title for the use case." },
        description: { type: Type.STRING, description: "A brief description of the user goal for this use case." },
        scenarios: {
            type: Type.ARRAY,
            items: testScenarioSchema,
            description: "A list of test scenarios related to this use case."
        }
    },
    required: ["id", "title", "description", "scenarios"]
};

const finalSchema = {
    type: Type.ARRAY,
    items: useCaseSchema
};

export const generateTestCases = async (htmlContent: string): Promise<UseCase[]> => {
  const prompt = `
    You are a world-class Senior QA Automation Engineer tasked with analyzing a webpage's HTML to create comprehensive test documentation.

    Analyze the following HTML content:
    ---
    ${htmlContent}
    ---

    Based on the HTML structure, elements (like forms, buttons, links, inputs), and ARIA roles, identify all key user features and functionalities.

    Generate a detailed list of use cases and corresponding test scenarios.

    For each use case, provide:
    1. A concise title.
    2. A brief description of the user's goal.
    3. A list of detailed test scenarios.

    For each test scenario, provide:
    1. A descriptive title.
    2. A classification type: 'Positive', 'Negative', or 'Edge Case'.
    3. A series of sequential steps a user would take.
    4. The expected result of performing those steps.

    Return your response strictly in the JSON format defined by the provided schema. Do not include any explanatory text or markdown formatting outside of the JSON structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: finalSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text?.trim();

    if (!jsonText) {
      console.error("Error: AI model returned an empty or invalid response.");
      throw new Error("Failed to get a valid response from the AI model.");
    }

    return JSON.parse(jsonText) as UseCase[];
  } catch (error) {
    console.error("Error generating test cases with Gemini:", error);
    throw new Error("Failed to parse or receive data from AI model.");
  }
};