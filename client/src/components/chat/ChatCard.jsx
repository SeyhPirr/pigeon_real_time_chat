import { Box } from "@mui/material";
import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import { Context } from "./ChatContext";
import { useContext } from "react";
import MessageNotification from "./MessageNotification";

function ChatCard() {
  const { chatViewID, notification, setNotification } = useContext(Context);
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
      {notification ? (
        <MessageNotification
          notification={notification}
          setNotification={setNotification}
        />
      ) : (
        ""
      )}
    </Box>
  );
}

export default ChatCard;
