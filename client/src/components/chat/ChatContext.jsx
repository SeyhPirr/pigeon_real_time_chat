import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const Context = React.createContext();
function ChatContext(props) {
  const [chatCreated, setChatCreated] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(true);
  useEffect(() => {
    console.log(window.location.pathname);
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/chat/data", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });

        console.log(response);
        if (response.status !== 200) {
          setChatCreated(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (window.location.pathname === "/" && buttonPressed) {
      setButtonPressed(false);
      getData();
    }
  });
  return (
    <Context.Provider value={[chatCreated, setChatCreated]}>
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
