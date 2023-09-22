import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { client, assignSession } from "./db/dbservice.js";
import cookieParser from "cookies-parser";
const router = new Router();
import { setCookie } from "https://deno.land/std@0.202.0/http/cookie.ts";

const app = new Application();
app.use(
  oakCors({
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  })
);
app.use(router.routes());

router.use(async (ctx, next) => {
  await next();
});

router.get("/login", (ctx) => {
  ctx.response.body = "selamlar";
});

router.post("/login", async (ctx) => {
  await ctx.cookies.set("jkdlkasjdkajdlkjasldjaksd", "dksjlakjsdlkjadlkjas");
  ctx.response.status = 200;
});

router.put("/signup", async (ctx) => {
  try {
    const data = await ctx.request.body().value;
    console.log(data);
    await client.execute(
      "INSERT INTO user(username,email,password) VALUES(?,?,?);",
      [data.username, data.email, data.password]
    );
    ctx.response.body = { message: "You signed up successfully." };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 401;
    ctx.response.body = { message: "Couldnt Signup." };
  }
});

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });
