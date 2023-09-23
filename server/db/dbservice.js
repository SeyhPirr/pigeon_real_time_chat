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

export async function createChat(session, email) {
  const { rows } = await client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [session]
  );
  const first_participant = rows[0].username;
  const response = await client.execute("SELECT * FROM user WHERE email=?", [
    email,
  ]);
  const second_participant = response.rows[0].username;
  if (first_participant === second_participant)
    throw new Error("You cant start a chat with yourself");

  const chats = await client.execute(
    "SELECT * FROM chat WHERE first_participant=?",
    [first_participant]
  );
  console.log("chats rows", chats.rows);
  chats.rows.forEach((row) => {
    console.log(row.second_participant);
  });
  await client.execute(
    "INSERT INTO chat(first_participant,second_participant) VALUES(?,?);",
    [first_participant, second_participant]
  );
}
