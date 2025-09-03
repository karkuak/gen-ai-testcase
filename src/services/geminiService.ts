import { GoogleGenAI, Type } from "@google/genai";
import { UseCase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      useCase: { type: Type.STRING },
      description: { type: Type.STRING },
      testScenarios: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            scenario: { type: Type.STRING },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            expectedResult: { type: Type.STRING },
          },
          required: ["scenario", "steps", "expectedResult"],
        },
      },
    },
    required: ["useCase", "description", "testScenarios"],
  },
};

export async function generateTestCasesFromHtml(
  htmlContent: string
): Promise<UseCase[]> {
  try {
    if (!htmlContent.trim()) {
      throw new Error("HTML content cannot be empty.");
    }
    
    const prompt = `
      Analyze the following HTML content. As an expert QA engineer, identify the primary user interactions, features, and functionalities.
      Based on this analysis, generate a comprehensive set of use cases and detailed test scenarios.
      For each use case, provide a clear description and multiple test scenarios.
      Each test scenario must include a title, a list of steps to reproduce, and the expected result.
      Focus on user journeys, edge cases, and accessibility.
      Return the output as a JSON array of use cases.

      HTML Content:
      \`\`\`html
      ${htmlContent}
      \`\`\`
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // FIX: Added .trim() to make JSON parsing more robust against leading/trailing whitespace, as per Gemini API guidelines.
    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the API.");
    }
    
    return JSON.parse(jsonText) as UseCase[];

  } catch (error) {
    console.error("Error generating test cases:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate test cases: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating test cases.");
  }
}