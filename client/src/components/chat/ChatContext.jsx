import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
export const Context = React.createContext();

function ChatContext(props) {
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState("");
  const [chatViewID, setChatViewID] = useState("");

  return (
    <Context.Provider
      value={{ chats, setChats, email, setEmail, chatViewID, setChatViewID }}
    >
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
