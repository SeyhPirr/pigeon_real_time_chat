import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UseWebsocket from "../../hooks/useWebsocket";
import useMessages from "../../hooks/useMessages";
export const Context = React.createContext();

function ChatContext(props) {
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState("");
  const [chatViewID, setChatViewID] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [notification, setNotification] = useState(null);
  const { openWebSocket, closeWebSocket, onMessage, webSocket } =
    UseWebsocket();
  const { getMessages, appendMessage } = useMessages();
  const [groupName, setGroupName] = useState("");
  const [chatType, setChatType] = useState("");
  const [newParticipant, setNewParticipant] = useState("");
  const [username, setUsername] = useState("");
  let messages;

  if (!messages) {
    messages = getMessages(chatViewID);
  }

  function sendMessage() {
    webSocket.send(
      JSON.stringify({
        event: "send-message",
        message: inputValue,
        reciever: currentContact,
        chat_id: chatViewID,
      })
    );
  }

  onMessage((e) => {
    const message = JSON.parse(e.data);
    console.log(message);
    if (chatViewID === message.chat_id) appendMessage(message);
    else {
      setNotification(`${message.sender}: ${message.content}`);
    }
  });

  // websocket open and close logic
  useEffect(() => {
    openWebSocket();
    return () => {
      closeWebSocket();
    };
  }, []);

  // get chats logic
  async function getChats() {
    try {
      const response = await fetch("http://localhost:8000/chat/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setChats(data.chats);

      if (response.status !== 200) {
        navigation.navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function getUsername() {
    try {
      const response = await fetch("http://localhost:8000/chat/username", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("usernameDATa:", data);
      setUsername(data.dbResponse.username);
    } catch (err) {
      console.error(err);
    }
  }

  async function addGroupParticipant() {
    try {
      const response = await fetch(
        "http://localhost:8000/chat/newParticipant",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            newParticipant,
            chatID: chatViewID,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createGroup() {
    try {
      const response = await fetch("http://localhost:8000/chat/group", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          groupName,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setChats([...chats, data]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //get chats execute
  useEffect(() => {
    getChats();
    getUsername();
  }, []);
  // create chat logic

  async function createChat() {
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
      console.log(data);
      if (response.status === 200) {
        setChats([...chats, data]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Context.Provider
      value={{
        chats,
        setEmail,
        chatViewID,
        setChatViewID,
        currentContact,
        setCurrentContact,
        sendMessage,
        createChat,
        messages,
        setInputValue,
        notification,
        setNotification,
        setGroupName,
        createGroup,
        chatType,
        setChatType,
        setNewParticipant,
        addGroupParticipant,
        username,
      }}
    >
      <Box>{props.children}</Box>
    </Context.Provider>
  );
}

export default ChatContext;
