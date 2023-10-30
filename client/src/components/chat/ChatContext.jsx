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
  // websocket open and close logic
  useEffect(() => {
    openWebSocket();
    return () => {
      closeWebSocket();
    };
  }, []);
  // assignChat
  useEffect(() => {
    if (chatViewID) assignChat(chatViewID);
  }, [chatViewID]);
  // get chats logic
  async function getChats() {
    try {
      const response = await fetch("http://localhost:8000/chat/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setChats(data.chats);

      if (response.status !== 200) {
        navigation.navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }
  //get chats execute
  useEffect(() => {
    getChats();
  }, []);
  // create chat logic
  async function createChat() {
    try {
      const response = await fetch("http://localhost:8000/chat/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setChats([...chats, data]);
      }
    } catch (err) {
      console.error(err);
    }
  }
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
        createChat,
      }}
    >
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
