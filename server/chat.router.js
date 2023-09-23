import { Router } from "https://deno.land/x/oak/mod.ts";
const chat = new Router();

import { createChat } from "./db/dbservice.js";

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
    ctx.response.body = { message: err.message };
    ctx.response.status = 401;
  }
});

export default chat;
