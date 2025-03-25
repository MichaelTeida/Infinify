import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const ChatMessages = ({
  messages,
}: {
  messages: { role: string; content: string }[];
}) => {
  const [feedback, setFeedback] = useState<{
    [key: number]: "like" | "dislike" | null;
  }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFeedback = (index: number, type: "like" | "dislike") => {
    setFeedback((prev) => ({
      ...prev,
      [index]: prev[index] === type ? null : type,
    }));
  };

  return (
    <div className="form-chat-messages" ref={messagesEndRef}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`relative transition-all duration-300 group messages_message-markdown ${
            message.role === "user"
              ? "form-chat-messages_message-user"
              : "form-chat-messages_message-chat"
          }`}
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter PreTag="div" language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },

              table({ node, ...props }) {
                return <table className="messages_message-table" {...props} />;
              },

              p({ node, children, ...props }) {
                return (
                  <p className="my-2 leading-snug" {...props}>
                    {children}
                  </p>
                );
              },

              h2({ node, children, ...props }) {
                return (
                  <h2 className="mt-2 mb-3 leading-tight text-xl" {...props}>
                    {children}
                  </h2>
                );
              },

              hr({ ...props }) {
                return (
                  <hr
                    className="my-2 border-none bg-primary/20 leading-tight text-xl h-[2px]"
                    {...props}
                  />
                );
              },
            }}
          >
            {message.content}
          </Markdown>

          {message.role === "assistant" && (
            <div className="flex space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFeedback(index, "like")}
                type="button"
              >
                {feedback[index] === "like" ? (
                  <ThumbUpIcon className={"messages_icon"} />
                ) : (
                  <ThumbUpAltOutlinedIcon className={"messages_icon"} />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFeedback(index, "dislike")}
                type="button"
              >
                {feedback[index] === "dislike" ? (
                  <ThumbDownIcon className={"messages_icon"} />
                ) : (
                  <ThumbDownAltOutlinedIcon className={"messages_icon"} />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigator.clipboard.writeText(message.content)}
                type="button"
              >
                <ContentCopyIcon className={"messages_icon"} />
              </Button>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
