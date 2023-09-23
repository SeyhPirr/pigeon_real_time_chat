import { Client } from "https://deno.land/x/mysql/mod.ts";
import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";

export const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "pigeon",
  password: "root123",
});

export async function assignSession(username) {
  await client.execute("DELETE FROM session WHERE username=?", [username]);
  const sessionID = uuid.v1.generate();
  await client.execute("INSERT INTO session(session_id,username) VALUES(?,?)", [
    sessionID,
    username,
  ]);
  return sessionID;
}

export async function checkSession(sessionID) {
  const dbResponse = client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [sessionID]
  );
  console.log(dbResponse);
  return dbResponse;
}

export async function signup(data) {
  await client.execute(
    "INSERT INTO user(username,email,password) VALUES(?,?,?);",
    [data.username, data.email, data.password]
  );
}
export async function login(data) {
  const { rows } = await client.execute("SELECT * FROM user WHERE username=?", [
    data.username,
  ]);
  const accountPassword = rows[0].password;

  if (accountPassword !== data.password) throw new Error("login error");
}
