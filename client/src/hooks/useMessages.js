import { useEffect, useState } from "react";

function UseMessages() {
  const [messages, setMessages] = useState(null);
  async function fetchMessages(chatID) {
    try {
      const response = await fetch(
        `http://localhost:8000/chat/messages?chatID=${chatID}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    }
  }
  function getMessages(chatID) {
    useEffect(() => {
      fetchMessages(chatID);
    }, [chatID]);
    return messages;
  }

  function appendMessage(message) {
    setMessages([...messages, message]);
  }

  return {
    getMessages,
    appendMessage,
  };
}
export default UseMessages;
