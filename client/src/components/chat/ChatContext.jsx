import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
export const Context = React.createContext();

function ChatContext(props) {
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState("");
  const [chatViewID, setChatViewID] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const [webSocket, setWebSocket] = useState(null);

  const closeWebSocket = () => {
    if (webSocket && chatViewID) {
      console.log("websokcet closed");

      webSocket.close();
      setWebSocket(null);
    }
  };
  const openWebsocket = (chatID) => {
    closeWebSocket();
    const newWebSocket = new WebSocket(
      `ws://localhost:8000/chat/connect?chatID=${chatID}`
    );

    newWebSocket.onopen = () => console.log("ws opened");
    newWebSocket.onclose = () => console.log("ws closed");
    setWebSocket(newWebSocket);
  };
  useEffect(() => {
    if (chatViewID) openWebsocket(chatViewID);
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
        webSocket,
      }}
    >
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
