import React, { useContext, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Context } from "./chat/ChatContext";
import Contacts from "./chat/Contacts";
import Chat from "./chat/Chat";
import ChatCard from "./chat/ChatCard";
function Home(props) {
  const [chatCreated, setChatCreated] = useContext(Context);
  useEffect(() => {
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
          navigation.navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  });

  return chatCreated ? (
    <Box>
      <ChatCard />
      <Box
        sx={{
          position: "absolute",
          top: "89.5vh",
          height: "8vh",
          left: "28.1vw",
        }}
      >
        <TextField
          sx={{ width: "66.70vw", bgcolor: "rgba(255,255,255,0.6)" }}
          onKeyDown={(e) => {
            if ((e.key = "Enter")) console.log("submit");
          }}
        />
      </Box>
    </Box>
  ) : (
    ""
  );
}

export default Home;
