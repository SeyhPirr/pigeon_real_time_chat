import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import ChatCard from "./chat/ChatCard";
import { Context } from "./chat/ChatContext";
import MessageNotification from "./chat/MessageNotification";
function Home() {
  return (
    <Box>
      <ChatCard />
      {/* <MessageNotification /> */}
    </Box>
  );
}

export default Home;
