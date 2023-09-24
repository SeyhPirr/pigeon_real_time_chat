import React from "react";
import { Paper } from "@mui/material";
function Contacts() {
  let contacts = [];
  for (let i = 0; i < 10; i++) {
    contacts.push(
      <Paper
        elevation={1}
        sx={{ color: "grey", fontSize: "24px", padding: "5px", margin: "5px" }}
      >
        Mehmet yuksel
      </Paper>
    );
  }
  return (
    <Paper
      sx={{
        height: "90vh",
        overflow: "auto",
        marginTop: "1%",
        width: "25vw",
        borderRadius: "5px",
        bgcolor: "rgba(255,255,255,0.6)",
      }}
    >
      <Paper elevation={2}>
        <h1 style={{ color: "Blue" }}>Contacts</h1>
      </Paper>
      {contacts}
    </Paper>
  );
}

export default Contacts;
