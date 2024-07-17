import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const POST = async (req: Request) => {
  try {
    const { file } = await req.json();

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: `Analyse and generate possible interview questions base on this file: ${file}`,
        },
      ],
    });

    return result.toAIStreamResponse();
  } catch (err) {
    return Response.json(err);
  }
};
