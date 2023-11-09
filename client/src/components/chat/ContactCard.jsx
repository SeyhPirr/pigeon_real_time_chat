import { Paper } from "@mui/material";
import React from "react";

function ContactCard({ chat, onClickFunction }) {
  return (
    <Paper
      elevation={1}
      sx={{
        color: "grey",
        fontSize: "24px",
        padding: "5px",
        margin: "5px",
        ":hover": {
          bgcolor: "rgba(240,240,240)",
        },
      }}
      id={chat.chat_id}
      onClick={onClickFunction}
    >
      {chat.chat_name}
    </Paper>
  );
}

export default ContactCard;
