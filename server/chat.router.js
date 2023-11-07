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
    console.log(err);
    ctx.response.body = { message: "You couldn`t create a chat." };
    ctx.response.status = 401;
  }
});

chat.get("/", async (ctx) => {
  try {
    const sessionID = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionID);
    if (dbResponse) {
      const chats = await getChats(dbResponse.username);
      console.log(chats);
      ctx.response.body = { chats };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You are not authoritized." };
    ctx.response.status = 401;
  }
});
let Clients = [];

function broadcast(reciever, sender, message) {
  Clients.forEach((client) => {
    if (reciever === client.username || sender === client.username) {
      if (client.socket.readyState === 1) client.socket.send(message);
      else return;
    }
  });
}

function remove(username) {
  let counter = 0;
  let index;
  Clients.forEach((client) => {
    if (client.username === username) {
      index = counter;
    }
    counter++;
  });
  console.log(index);
  if (index > -1) {
    Clients.splice(index, 1);
  }
  console.log("inside remove", Clients);
}
chat.get("/connect", async (ctx) => {
  const socket = await ctx.upgrade();
  const sessionID = await ctx.cookies.get("session");
  const dbResponse = await checkSession(sessionID);
  const username = dbResponse.username;
  Clients.push({ username, socket });
  socket.onclose = () => {
    console.log(`Client ${username} disconnected`);
    remove(username);
    console.log(Clients);
  };

  ////on message logic
  socket.onmessage = async (m) => {
    const data = JSON.parse(m.data);
    if (data.event === "send-message") {
      await insertMessage({
        chat_id: data.chat_id,
        content: data.message,
        sender: username,
      });
      const messageID = Date.now();

      broadcast(
        data.reciever,
        username,
        JSON.stringify({
          id: messageID,
          chat_id: data.chat_id,
          sender: username,
          content: data.message,
        })
      );
    }
  };
});
chat.get("/messages", async (ctx) => {
  try {
    const sessionId = await ctx.cookies.get("session");
    const dbResponse = await checkSession(sessionId);
    const chatID = ctx.request.url.searchParams.get("chatID");
    if (dbResponse) {
      const messages = await getMessages(chatID);
      ctx.response.body = { messages };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.body = { message: "You couldnt get messages." };
    ctx.response.status = 401;
  }
});
export default chat;
