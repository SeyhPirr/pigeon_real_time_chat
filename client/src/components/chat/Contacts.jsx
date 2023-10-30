import React from "react";
import { Paper, Box, Input, Button } from "@mui/material";
import { Context } from "./ChatContext";
import { useContext } from "react";
import { useState } from "react";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ContactCard from "./ContactCard";
function Contacts() {
  const { chats, setEmail, setChatViewID, setCurrentContact, createChat } =
    useContext(Context);
  const [trigger, setTrigger] = useState(false);

  return (
    <Paper
      sx={{
        height: "90vh",
        overflow: "auto",
        marginTop: "1%",
        width: "25vw",
        borderRadius: "5px",
        bgcolor: "rgba(255,255,255,0.6)",
        position: "absolute",
        left: "0%",
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "row" }} elevation={2}>
        <h1 style={{ color: "grey" }}>Contacts</h1>
        <MapsUgcIcon
          onClick={() => {
            setTrigger(!trigger);
          }}
          sx={{
            color: "blue",
            top: "3vh",

            ":hover": {
              color: "red",
            },
          }}
        />
        {trigger ? (
          <Box sx={{ position: "relative", top: "30px", right: "100px" }}>
            <Input
              sx={{
                background: "rgba(255,255,255,0.6)",
                width: "110%",
                fontSize: "14px",
              }}
              placeholder="Email of the user you want to start a chat."
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createChat();
                  setTrigger(false);
                }
              }}
              type="email"
            />
            <Button
              sx={{ position: "relative", left: "110%", bottom: "50%" }}
              onClick={() => {
                createChat();
                setTrigger(false);
              }}
            >
              Send
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Paper>
      {chats.map((chat) => (
        <ContactCard
          key={chat.id}
          chat={chat}
          onClickFunction={(event) => {
            setChatViewID(event.target.id);
            setCurrentContact(chat.contact);
          }}
        />
      ))}
    </Paper>
  );
}

export default Contacts;
