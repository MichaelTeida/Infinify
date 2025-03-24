import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_PROVIDER_BASEURL,
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

    const { messages, model, stream } = await req.json();

    if (!messages) {
      return NextResponse.json(
        { error: "Messages is required" },
        { status: 400 },
      );
    }

    if (!model) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 });
    }

    let formattedMessages = messages;
    if (model.startsWith("google")) {
      console.log("Google model selected");
      formattedMessages = messages.map((message: any) => ({
        role: message.role,
        content: [
          {
            type: "text",
            text: message.content,
          },
        ],
      }));
    }

    if (stream) {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: formattedMessages,
        stream: true,
      });

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (!content) continue;
            controller.enqueue(encoder.encode(content));
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
        messages: formattedMessages,
        stream: false,
      });

      const responseMessage = completion.choices[0].message.content;
      return NextResponse.json({ response: responseMessage });
    }
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Error communicating with AI Provider - OpenAI API error" },
      { status: 500 },
    );
  }
}
