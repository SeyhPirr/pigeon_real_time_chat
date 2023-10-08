import React from "react";
import { Paper, Box, Input, Button } from "@mui/material";
import { Context } from "./ChatContext";
import { useContext } from "react";
import { useState } from "react";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

function Contacts() {
  const {
    chats,
    setChats,
    email,
    setEmail,
    setChatViewID,
    setCurrentContact,
    currenContact,
  } = useContext(Context);
  const [trigger, setTrigger] = useState(false);
  async function handleButton() {
    try {
      const response = await fetch("http://localhost:8000/chat/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      const newArray = [...chats];
      newArray.push(data);

      if (response.status === 200) {
        setChats(newArray);
      }
    } catch (err) {
      console.error(err);
    }
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
                  handleButton();
                  setTrigger(false);
                }
              }}
              type="email"
            />
            <Button
              sx={{ position: "relative", left: "110%", bottom: "50%" }}
              onClick={() => {
                handleButton();
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
          key={chat.id}
          id={chat.id}
          onClick={(event) => {
            console.log(chat.contact, chat.id);
            setChatViewID(event.target.id);
            setCurrentContact(chat.contact);
          }}
        >
          {chat.contact}
        </Paper>
      ))}
    </Paper>
  );
}

export default Contacts;
