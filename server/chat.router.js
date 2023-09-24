import { Router } from "https://deno.land/x/oak/mod.ts";
const chat = new Router();

import { createChat, checkSession } from "./db/dbservice.js";

chat.post("/create", async (ctx) => {
  try {
    const data = await ctx.request.body().value;
    console.log(data);
    const sessionId = await ctx.cookies.get("session");
    console.log("SESSION:", sessionId);
    await createChat(sessionId, data.email);

    ctx.response.body = { message: "succesfully reached the endpoint" };
  } catch (err) {
    console.log(err);
    ctx.response.body = { message: "You couldn`t create a chat." };
    ctx.response.status = 401;
  }
});

chat.get("/data", async (ctx) => {
  try {
    const sessionId = await ctx.cookies.get("session");
    console.log("SESSION:", sessionId);
    const dbResponse = await checkSession(sessionId);
    if (dbResponse) return (ctx.response.body = { message: "succesfull" });
    ctx.response.body = { message: "You are not authoritized." };
    ctx.response.status = 401;
  } catch (err) {
    console.log(err);
  }
});

export default chat;
