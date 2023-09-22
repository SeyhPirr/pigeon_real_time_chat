import { Client } from "https://deno.land/x/mysql/mod.ts";
import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";

export const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "pigeon",
  password: "root123",
});

export function assignSession(username) {
  const sessionID = uuid.v1.generate();
  client.execute("INSERT INTO session(session_id,username) VALUES(?,?)", [
    sessionID,
    username,
  ]);
}

export function checkSession(sessionID) {
  const dbResponse = client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [sessionID]
  );
  return dbResponse;
}
