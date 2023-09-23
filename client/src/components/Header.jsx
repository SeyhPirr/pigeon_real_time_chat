import { Box, Button, IconButton, Input, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import FlutterDashSharpIcon from "@mui/icons-material/FlutterDashSharp";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useState } from "react";

export default function Header(props) {
  const [trigger, setTrigger] = useState(false);
  return (
    <Box
      sx={{
        position: "sticky",
        bgcolor: "rgba(255, 255, 255, 0.4)",
        top: 0,
        width: "auto",
        color: "red",
        padding: "5px",
        borderRadius: "5px",
        zIndex: 10,
        height: "5vh",
      }}
    >
      <Link to="/">
        <FlutterDashSharpIcon
          sx={{
            color: "blue",
            height: "100%",
            width: "4%",
            ":hover": {
              color: "red",
            },
          }}
        />
      </Link>
      <MapsUgcIcon
        onClick={() => {
          setTrigger(!trigger);
          console.log(trigger);
        }}
        sx={{
          color: "blue",

          ":hover": {
            color: "red",
          },
        }}
      />
      {trigger ? (
        <Box
          sx={{
            width: "30%",
            height: "100%",
            position: "relative",
            bottom: "100%",
            left: "10%",
            marginLeft: "30px",
          }}
        >
          <Input
            sx={{
              background: "rgba(255,255,255,0.6)",
              width: "100%",
            }}
            placeholder="Write the email of the user you want to start a chat."
          />
          <Button sx={{ position: "relative", left: "100%", bottom: "120%" }}>
            Send
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
