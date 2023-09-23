import { Box, Button } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
function Popup(props) {
  return props.trigger ? (
    <Box
      sx={{
        bgcolor: "rgba(255,255,255,0.5)",
        color: "red",
        width: "30%",
        height: "20%",

        display: "block",
        marginTop: "10px",
        borderRadius: "5px",
        zIndex: "10px",
      }}
    >
      <Button
        onClick={() => {
          props.setTrigger(false);
        }}
      >
        <CancelIcon color="action" />
      </Button>
      {props.children}
    </Box>
  ) : (
    ""
  );
}

export default Popup;
