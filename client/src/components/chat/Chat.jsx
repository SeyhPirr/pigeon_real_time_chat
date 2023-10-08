import React, { useEffect, useState, useRef } from "react";
import { Paper, Box, Input } from "@mui/material";
import { Context } from "./ChatContext";
import { useContext } from "react";
import MessageList from "./MessageList";
function Chat() {
  const { chatViewID, currentContact, webSocket } = useContext(Context);
  const [currentChat, setCurrentChat] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messageExists, setMessageExist] = useState(false);

  async function getMessages() {
    try {
      const response = await fetch(
        `http://localhost:8000/chat/messages?chatID=${chatViewID}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setCurrentChat(data.messages);
        setMessageExist(true);
      }
    } catch (err) {
      console.error(err);
    }
  }
  // execute get messages
  useEffect(() => {
    getMessages();
  }, [chatViewID]);
  //control on message
  if (webSocket)
    webSocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setCurrentChat([...currentChat, message]);
    };

  function sendMessage() {
    webSocket.send(
      JSON.stringify({
        message: inputValue,
        reciever: currentContact,
        chat_id: chatViewID,
      })
    );
  }

  //////***********************************************************
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        sx={{
          height: "90vh",
          overflow: "auto",
          marginTop: "1%",
          width: "70%",
          borderRadius: "5px",
          marginLeft: "3%",
          bgcolor: "rgba(255,255,255,0.6)",
          position: "absolute",
          left: "25%",
        }}
      >
        <Paper elevation={2}>
          <h1 style={{ color: "grey" }}>{currentContact}</h1>
        </Paper>
        <Box sx={{ width: "100%", height: "100%" }}>
          {messageExists ? <MessageList messages={currentChat} /> : ""}
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
              sendMessage();
              e.target.value = "";
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default Chat;
