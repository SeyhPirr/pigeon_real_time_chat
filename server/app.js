import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import account from "./account.router.js";

const app = new Application();
const accountRouter = new Router().use("/account", account.routes());

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
app.use(accountRouter.routes());

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });
