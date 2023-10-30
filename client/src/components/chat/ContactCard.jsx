import { Paper } from "@mui/material";
import React from "react";

function ContactCard(props) {
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
      id={props.chat.id}
      onClick={(event) => {
        console.log(props.chat.contact, props.chat.id);
        props.setChatViewID(event.target.id);
        props.setCurrentContact(props.chat.contact);
      }}
    >
      {props.chat.contact}
    </Paper>
  );
}

export default ContactCard;
