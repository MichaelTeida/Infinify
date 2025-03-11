import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.AI_PROVIDER_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 },
      );
    }

    const { message, model, stream } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (!model) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 });
    }

    if (stream) {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: message }],
        stream: true,
      });

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(`data: ${content}\n\n`));
          }
          controller.close();
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    } else {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: message }],
        stream: false,
      });

      const responseMessage = completion.choices[0].message.content;
      return NextResponse.json({ response: responseMessage });
    }
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    NextResponse.json(
      { error: "Error communicating with OpenAI" },
      { status: 500 },
    );
  }
}
