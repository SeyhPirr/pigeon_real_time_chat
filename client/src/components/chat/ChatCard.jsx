import { Box, TextField } from "@mui/material";
import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";

function ChatCard() {
  return (
    <Box
      sx={{
        width: "95vw",
        height: "95vh",
        display: "flex",
        direction: "row",
        justifyContent: "center",
      }}
    >
      <Contacts />
      <Chat />
    </Box>
  );
}

export default ChatCard;
