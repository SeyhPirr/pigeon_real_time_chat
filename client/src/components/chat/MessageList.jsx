import React from "react";
import MessageItem from "./MessageItem";
import { Box } from "@mui/material";

const MessageList = ({ messages }) => {
  const chatContent = [...messages];
  return (
    <Box>
      {chatContent.map((item) => (
        <MessageItem key={item.id} message={item} />
      ))}
    </Box>
  );
};

export default MessageList;
