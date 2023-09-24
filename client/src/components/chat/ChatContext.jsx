import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";

export const Context = React.createContext();
function ChatContext(props) {
  const [chatCreated, setChatCreated] = useState(false);

  return (
    <Context.Provider value={[chatCreated, setChatCreated]}>
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
