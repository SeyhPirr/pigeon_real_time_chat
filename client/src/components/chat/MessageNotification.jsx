import { Box } from "@mui/material";
import React from "react";

function MessageNotification() {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0,0,0,0.8)",
        position: "absolute",
        left: "40%",
        width: "15%",
        height: "20%",
        top: "0",
        zIndex: "10px",
        borderRadius: "10px",
      }}
    >
      selamlar
    </Box>
  );
}

export default MessageNotification;
