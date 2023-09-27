import React, { useEffect, useState, useRef } from "react";
import { Paper, Box, TextField, Typography } from "@mui/material";
import { Context } from "./ChatContext";
import { useContext } from "react";
function Chat() {
  const { chatViewID } = useContext(Context);
  const [currentChat, setCurrentChat] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/chat/connect`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    const wsCurrent = ws.current;
  }, []);

  async function getMessages() {
    try {
      const response = await fetch(
        `http://localhost:8000/chat/messages?receiver=${chatViewID}`,
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
      setCurrentChat(
        data.messages.map((messageData) => {
          if (messageData.sender === chatViewID)
            return <Box key={messageData.id}>{messageData.content}</Box>;
          if (messageData.sender !== chatViewID)
            return (
              <Box
                key={messageData.id}
                sx={{ position: "relative", left: "70%" }}
              >
                {messageData.content}
              </Box>
            );
        })
      );
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getMessages();
  }, [isPaused, chatViewID]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      console.log("hey there");
      getMessages();
      const message = JSON.parse(e.data);
      console.log("MESSAGE:", message);
    };
  }, [isPaused]);

  function sendMessage() {
    ws.current.send(
      JSON.stringify({
        event: "send-message",
        message: inputValue,
        reciever: chatViewID,
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
          <h1 style={{ color: "grey" }}>{chatViewID}</h1>
        </Paper>
        <Box sx={{ width: "100%", height: "100%" }}> {currentChat}</Box>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          top: "89.5vh",
          height: "8vh",
          left: "28.1vw",
        }}
      >
        <TextField
          sx={{ width: "460%", bgcolor: "rgba(255,255,255,0.6)" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setPause(!isPaused);
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
