import React from "react";
import { useState } from "react";
function UseWebsocket() {
  const [webSocket, setWebsocket] = useState();
  function openWebSocket() {
    const connection = new WebSocket(`ws://localhost:8000/chat/connect`);

    connection.onopen = () => console.log("ws opened");
    connection.onclose = () => console.log("ws closed");
    console.log(connection);
    setWebsocket(connection);
  }
  function closeWebSocket(chatID) {
    if (chatID && webSocket) webSocket.close();
  }
  function onMessage(onMessageFunction) {
    console.log("ON MESSAGE HEY THERE");
    if (webSocket)
      webSocket.onmessage = (e) => {
        onMessageFunction(e);
      };
  }
  function sendMessage(message) {
    console.log("WEBSOCKET", webSocket);
    webSocket.send(message);
  }

  function assignChat(chatID) {
    if (webSocket)
      webSocket.send(
        JSON.stringify({
          event: "assign-chat",
          chat_id: chatID,
        })
      );
  }
  return {
    openWebSocket,
    closeWebSocket,
    sendMessage,
    onMessage,
    assignChat,
  };
}

export default UseWebsocket;
