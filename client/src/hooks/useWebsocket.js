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
    if (webSocket)
      webSocket.onmessage = (e) => {
        onMessageFunction(e);
      };
  }

  return {
    openWebSocket,
    closeWebSocket,
    onMessage,
    webSocket,
  };
}

export default UseWebsocket;
