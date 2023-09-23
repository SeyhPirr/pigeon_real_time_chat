import React from "react";
import Chat from "./Chat";
import Header from "./Header";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
function Home(props) {
  const [chat, setChat] = useState(false);
  const [send, setSend] = useState(false);

  return (
    <Box>
      <Header />
      <Paper sx={{ height: "30px", overflow: "auto", marginTop: "10px" }}>
        <Chat />
      </Paper>
    </Box>
  );
}

export default Home;
