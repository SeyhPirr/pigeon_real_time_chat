import { Application, Router } from "oak";
const connectedClients = new Map();
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const port = 8000;
const router = new Router();
app.use(async (context, next) => {
  try {
    const currentDir = Deno.cwd();
    const parentDir = `${currentDir}/..`;
    await context.send({
      root: `${parentDir}/dummy`,
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

  broadcast(
    JSON.stringify({
      event: "update-users",
      usernames: usernames,
    })
  );
}
router.post("/login", (ctx) => {
  console.log("hey there");
  console.log(ctx.request.data);
});

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

  socket.onopen = () => {
    console.log("opened");
  };
  socket.onclose = () => {
    connectedClients.delete(socket.username);
    console.log(`user ${socket.username} has left the chat`);
  };

  socket.onmessage = (m) => {
    const data = JSON.parse(m.data);
    if (data.event === "send-message") {
      broadcast(
        JSON.stringify({
          event: "send-message",
          username: socket.username,
          message: data.message,
        })
      );
    }
  };
});
app.use(oakCors());

app.use(router.routes());

console.log("Listening at http://localhost:" + port);
await app.listen({ port });
