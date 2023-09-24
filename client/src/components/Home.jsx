import React, { useContext, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Context } from "./chat/ChatContext";
import ChatCard from "./chat/ChatCard";
function Home(props) {
  const [chatCreated, setChatCreated] = useContext(Context);
  console.log(chatCreated);
  if (!chatCreated) navigation.navigate("/login");

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
            if (e.key == "Enter") console.log("submit");
          }}
        />
      </Box>
    </Box>
  ) : (
    ""
  );
}

export default Home;
