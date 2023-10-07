import { Router } from "https://deno.land/x/oak/mod.ts";
const chat = new Router();

import {
  createChat,
  checkSession,
  getChats,
  insertMessage,
  getMessages,
} from "./db/dbservice.js";

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
    const sessionID = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionID);
    if (dbResponse) {
      const chats = await getChats(dbResponse.username, sessionID);
      ctx.response.body = { chats };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You are not authoritized." };
    ctx.response.status = 401;
  }
});
let Clients = [];

function broadcast(chatID, message) {
  Clients.forEach((client) => {
    if (client.chatID == chatID) {
      if (client.socket.readyState === 1) client.socket.send(message);
      else return;
    }
  });
}

function remove(value) {
  const index = Clients.indexOf(value);
  if (index > -1) {
    Clients.splice(index, 1);
  }
}
chat.get("/connect", async (ctx) => {
  const socket = await ctx.upgrade();
  const sessionID = await ctx.cookies.get("session");
  const dbResponse = await checkSession(sessionID);
  const username = dbResponse.username;
  console.log(`New client connected: ${username}`);
  const chatID = ctx.request.url.searchParams.get("chatID");
  console.log(chatID);
  Clients.push({ username, chatID, socket });

  socket.onclose = () => {
    console.log(`Client ${username} disconnected`);
    remove({ username, chatID, socket });
  };

  ////on message logic
  socket.onmessage = async (m) => {
    const data = JSON.parse(m.data);
    await insertMessage({
      chat_id: chatID,
      content: data.message,
      sender: username,
    });
    const messageID = Date.now();

    broadcast(
      chatID,
      JSON.stringify({
        id: messageID,
        chat_id: chatID,
        sender: username,
        content: data.message,
      })
    );
  };
});
chat.get("/messages", async (ctx) => {
  try {
    const sessionId = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionId);
    const chatID = ctx.request.url.searchParams.get("chatID");
    console.log(chatID);
    if (dbResponse) {
      const messages = await getMessages(chatID);
      console.log(messages);
      ctx.response.body = { messages };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You couldnt get messages." };
    ctx.response.status = 401;
  }
});
export default chat;
