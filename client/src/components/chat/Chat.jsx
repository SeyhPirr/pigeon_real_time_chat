import React, { useEffect, useState } from "react";
import { Paper, Box, Input } from "@mui/material";
import { Context } from "./ChatContext";
import { useContext } from "react";
import MessageList from "./MessageList";
import UseMessages from "../../hooks/useMessages";
function Chat() {
  const { chatViewID, currentContact, sendMessage, onMessage } =
    useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const { getMessages } = UseMessages();
  const [messageRecieved, setMessageRecieved] = useState(false);
  let messages;
  if (!messages) {
    messages = getMessages(chatViewID);
  }
  onMessage((e) => {
    console.log("onMessage CHAT   ");
    const message = JSON.parse(e.data);
    console.log(message);
    messages.push(message);
    setMessageRecieved(!messageRecieved);
  });

  //////***********************************************************
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        sx={{ position: "absolute", left: "28%", width: "70%" }}
        elevation={2}
      >
        <h1 style={{ color: "grey" }}>{currentContact}</h1>
      </Paper>
      <Paper
        sx={{
          height: "83.3vh",
          overflow: "auto",
          marginTop: "1%",
          width: "70%",
          borderRadius: "5px",
          marginLeft: "3%",
          bgcolor: "rgba(255,255,255,0.6)",
          position: "absolute",
          left: "25%",
          top: "8%",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          {messages ? <MessageList messages={messages} /> : ""}
        </Box>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          top: "89.5vh",
          height: "8vh",
          left: "28.1vw",
        }}
      >
        <Input
          sx={{
            width: "70vw",
            bgcolor: "rgba(255,255,255,0.6)",
            position: "absolute",
            bottom: "0vh",
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              if (inputValue) {
                sendMessage(
                  JSON.stringify({
                    event: "send-message",
                    message: inputValue,
                    reciever: currentContact,
                    chat_id: chatViewID,
                  })
                );
                e.target.value = "";
                setInputValue("");
              }
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default Chat;
