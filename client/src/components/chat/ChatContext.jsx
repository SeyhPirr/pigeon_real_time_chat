import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UseWebsocket from "../../hooks/useWebsocket";
export const Context = React.createContext();

function ChatContext(props) {
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState("");
  const [chatViewID, setChatViewID] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const { openWebSocket, closeWebSocket, sendMessage, onMessage, assignChat } =
    UseWebsocket();
  useEffect(() => {
    openWebSocket();
    return () => {
      closeWebSocket();
    };
  }, []);
  useEffect(() => {
    if (chatViewID) assignChat(chatViewID);
  }, [chatViewID]);
  return (
    <Context.Provider
      value={{
        chats,
        setChats,
        email,
        setEmail,
        chatViewID,
        setChatViewID,
        currentContact,
        setCurrentContact,
        sendMessage,
        onMessage,
        assignChat,
      }}
    >
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
