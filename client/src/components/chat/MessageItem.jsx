import React from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Context } from "./ChatContext";

function MessageItem({ message }) {
  const { currentContact } = useContext(Context);
  if (message.sender === currentContact) {
    return (
      <Box
        sx={{
          bgcolor: "#ff44cc",
          position: "relative",
          left: "0%",
          maxWidth: "200px",
          borderRadius: "3px",
        }}
        key={message.id}
      >
        {message.content}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          position: "relative",
          left: "80%",
          bgcolor: "#40b3c7",
          maxWidth: "200px",
          borderRadius: "3px",
        }}
      >
        {message.content}
      </Box>
    );
  }
}

export default MessageItem;
