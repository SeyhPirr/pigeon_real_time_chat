import { Router } from "https://deno.land/x/oak/mod.ts";
import { assignSession, signup, login } from "./db/dbservice.js";
const account = new Router();
account.post("/login", async (ctx) => {
  try {
    const data = await ctx.request.body().value;
    await login(data);
    const sessionID = await assignSession(data.username);
    await ctx.cookies.set("session", sessionID);

    ctx.response.body = { message: "You signed up successfully." };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 401;
    ctx.response.body = { message: "Couldnt Signup." };
  }
});

account.post("/signup", async (ctx) => {
  try {
    const data = await ctx.request.body().value;
    await signup(data);
    const sessionID = await assignSession(data.username);
    await ctx.cookies.set("session", sessionID);

    ctx.response.body = { message: "You signed up successfully." };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 401;
    ctx.response.body = { message: "Couldnt Signup." };
  }
});

export default account;
