import { Router } from "https://deno.land/x/oak/mod.ts";
const chat = new Router();

import {
  createChat,
  checkSession,
  getChats,
  insertMessage,
  getMessages,
} from "./db/dbservice.js";
const connectedClients = new Map();

chat.post("/create", async (ctx) => {
  try {
    const data = await ctx.request.body().value;
    const sessionId = await ctx.cookies.get("session");
    const InsertedChat = await createChat(sessionId, data.email);

    ctx.response.body = InsertedChat;
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You couldn`t create a chat." };
    ctx.response.status = 401;
  }
});

chat.get("/", async (ctx) => {
  try {
    const sessionId = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionId);
    if (dbResponse) {
      const chats = await getChats(dbResponse.username);
      ctx.response.body = { chats };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You are not authoritized." };
    ctx.response.status = 401;
  }
});
function broadcast(reciever, message) {
  console.log(reciever);
  for (const client of connectedClients) {
    if (client[0] == reciever) {
      console.log("hey there");

      client[1].send(message);
    }
  }
}
chat.get("/connect", async (ctx) => {
  const socket = await ctx.upgrade();
  const sessionID = await ctx.cookies.get("session");
  const dbResponse = await checkSession(sessionID);
  const username = dbResponse.username;
  connectedClients.set(username, socket);
  console.log(`New client connected: ${username}`);

  socket.onclose = () => {
    console.log(`Client ${username} disconnected`);
    connectedClients.delete(username);
  };
  socket.onmessage = async (m) => {
    const data = JSON.parse(m.data);
    console.log(data);
    await insertMessage({
      sender: username,
      reciever: data.reciever,
      content: data.message,
    });
    switch (data.event) {
      case "send-message":
        broadcast(
          data.reciever,
          JSON.stringify({
            event: "send-message",
            username: socket.username,
            message: data.message,
          })
        );
        break;
    }
  };
});
chat.get("/messages", async (ctx) => {
  try {
    const sessionId = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionId);
    const receiver = ctx.request.url.searchParams.get("receiver");
    console.log(receiver);
    if (dbResponse) {
      const messages = await getMessages(dbResponse.username, receiver);
      ctx.response.body = { messages };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You couldnt get messages." };
    ctx.response.status = 401;
  }
});
export default chat;
