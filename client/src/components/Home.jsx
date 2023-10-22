import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import ChatCard from "./chat/ChatCard";
import { Context } from "./chat/ChatContext";
function Home() {
  const { setChats, email } = useContext(Context);

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

  useEffect(() => {
    getChats();
  }, [email]);

  return (
    <Box>
      <ChatCard />
    </Box>
  );
}

export default Home;
