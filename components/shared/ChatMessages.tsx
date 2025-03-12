import React, { useState } from "react";
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

  const handleFeedback = (index: number, type: "like" | "dislike") => {
    setFeedback((prev) => ({
      ...prev,
      [index]: prev[index] === type ? null : type,
    }));
  };

  return (
    <div className="form-chat-messages">
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
            children={message.content}
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
                  <p className="my-2" {...props}>
                    {children}
                  </p>
                );
              },
            }}
          />

          {message.role === "chat" && (
            <div className="flex space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
    </div>
  );
};

export default ChatMessages;
