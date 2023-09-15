import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const connectedClients = new Map();

const app = new Application();
const port = 8080;
const router = new Router();
app.use(async (context, next) => {
  try {
    console.log(Deno.cwd());
    await context.send({
      root: `${Deno.cwd()}/client`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function broadcast(message) {
  for (const client of connectedClients.values()) {
    client.send(message);
  }
}

function broadcast_usernames() {
  const usernames = [...connectedClients.keys()];
}

router.get("/start_web_socket", async (ctx) => {
  const socket = await ctx.upgrade();
  const username = ctx.request.url.searchParams.get("username");
  if (connectedClients.has(username)) {
    socket.close(1008, `Username ${username} is already taken`);
    return;
  }
  socket.username = username;
  connectedClients.set(username, socket);
  console.log(`New client connected: ${username}`);
});
