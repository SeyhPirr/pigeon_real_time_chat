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
  const dbResponse = await client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [sessionID]
  );
  if (!dbResponse.rows[0].username) return false;
  return dbResponse.rows[0];
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
  const participant_1 = rows[0].username;
  const response = await client.execute("SELECT * FROM user WHERE email=?", [
    email,
  ]);

  const participant_2 = response.rows[0].username;

  if (participant_1 === participant_2)
    throw new Error("You cant start a chat with yourself");

  const chats = await client.execute(
    "SELECT * FROM chat WHERE (participant_1=? AND participant_2=?) OR (participant_1 =? AND participant_2=?)",
    [participant_1, participant_2, participant_2, participant_1]
  );

  if (chats.rows[0]?.participant_1) throw new Error("Chat already exists!");
  const chatID = uuid.v1.generate();

  await client.execute(
    "INSERT INTO chat(id,participant_1,participant_2) VALUES(?,?,?)",
    [chatID, participant_1, participant_2]
  );
  return { id: chatID, participant_1, participant_2 };
}
export async function getChats(username, session) {
  const { rows } = await client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [session]
  );
  const currentUser = rows[0].username;
  const chatData = await client.execute(
    "SELECT id, IF(participant_1=? ,participant_2 , participant_1 )as contact FROM chat WHERE participant_1 = ? OR participant_2 = ?",
    [currentUser, username, username]
  );
  return chatData.rows;
}

export async function insertMessage(data) {
  await client.execute(
    "INSERT INTO message(chat_id,content,sender) VALUES(?,?,?);",
    [data.chat_id, data.content, data.sender]
  );
}

export async function getMessages(chat_id) {
  const messageData = await client.execute(
    "SELECT * FROM message WHERE chat_id=?  ORDER BY id ASC ",
    [chat_id]
  );
  return messageData.rows;
}
