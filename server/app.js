import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import execute from "./db/dbservice.js";
const router = new Router();
router.post("/login", async (ctx) => {
  const data = await ctx.request.body().value;
  console.log(data);
  ctx.response.body = { message: "server" };
});

router.post("/signup", async (ctx) => {
  const data = await ctx.request.body().value;
  console.log(data);
  await execute(
    `INSERT INTO user(username,email,password) VALUES(${data.username},${data.email},${data.password})`
  );
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });
