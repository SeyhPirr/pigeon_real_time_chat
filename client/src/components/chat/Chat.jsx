import React from "react";
import { Box, Input } from "@mui/material";
import { Paper, TextField } from "@mui/material";

function Chat(props) {
  return (
    <Paper
      sx={{
        height: "90vh",
        overflow: "auto",
        marginTop: "1%",
        width: "70%",
        borderRadius: "5px",
        marginLeft: "3%",
        bgcolor: "rgba(255,255,255,0.6)",
      }}
    >
      <Paper elevation={2}>
        <h1 style={{ color: "grey" }}>Chat name</h1>
      </Paper>
    </Paper>
  );
}

export default Chat;
