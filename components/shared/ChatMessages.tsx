import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

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
          className={` relative transition-all duration-300 group ${
            message.role === "user"
              ? "form-chat-messages_message-user"
              : "form-chat-messages_message-chat"
          }`}
        >
          {message.content}
          {message.role === "chat" && (
            <div className="flex space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFeedback(index, "like")}
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
