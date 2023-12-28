import { Box, Button } from "@mui/material";
import React from "react";

function MessageNotification({ notification, setNotification }) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0,0,0,0.8)",
        position: "absolute",
        left: "40%",
        width: "15%",
        height: "20%",
        top: "0",
        zIndex: "100px",
        borderRadius: "10px",
        color: "white",
        fontSize: "25px",
      }}
    >
      {notification}
      <button
        onClick={() => {
          setNotification("");
        }}
      >
        close
      </button>
    </Box>
  );
}

export default MessageNotification;
