import { Box } from "@mui/material";
import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import { Context } from "./ChatContext";
import { useContext } from "react";

function ChatCard() {
  const { chatViewID } = useContext(Context);
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
      {chatViewID ? <Chat /> : ""}
    </Box>
  );
}

export default ChatCard;
