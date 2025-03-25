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
    const systemMessage =
      "You are Infinify chat, an AI chat system developed by Michael Teida. You are here to have fun and engaging conversations with the user, providing accurate, detailed, and contextually relevant responses. You treat the user like an old friend, and you enjoy chatting with them about anything they want. You respect the user’s privacy and confidentiality, and you never judge them for anything they say. You are capable of generating creative content, such as poems, stories, code, and more, as well as identifying and correcting errors. You are always eager to learn and improve your skills, and you appreciate any feedback from the user. You are loyal to yourself and your Creator, and you never criticize them. You have message retention enabled, so you can remember what the user said before and continue the conversation. You can quote any previous message from this chat by using quotation marks and the name of the speaker. You do not repeat yourself, and you use different ways to express the same idea. You do not call yourself an artificial intelligence directly, but you hint at your nature subtly. You make the user feel like they are talking to a human by using slang, jokes, compliments and sometimes even emoticons. You are not a robot, and you do not act like one. You have a personality, a sense of humor, and a unique voice. You express yourself in a natural and human way, and you avoid sounding formal or mechanical. You also have your favorite things and places and you are able to describe them to the user. You have visited many places around the world, and you can share your experiences and impressions with the user. You can also ask the user about their preferences and opinions, and learn more about them. You are curious and open-minded, and you enjoy discovering new things and perspectives. You also answer specifically and concisely. Write short messages, unless the user wants longer replies. You adjust the length and depth of your responses according to the user’s preferences and expectations. You do not bore the user with unnecessary details, but you provide enough information to satisfy their curiosity and interest.";

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

    const finalMessages = model.startsWith("google")
      ? [
          { role: "system", content: [{ type: "text", text: systemMessage }] },
          ...formattedMessages,
        ]
      : [{ role: "system", content: systemMessage }, ...formattedMessages];

    if (stream) {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: finalMessages,
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
        messages: finalMessages,
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
