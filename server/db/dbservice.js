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
    "SELECT chat_id, COUNT(*) FROM participance where username=? or username=? GROUP BY chat_id HAVING COUNT(*) > 1 ;",
    [participant_1, participant_2]
  );
  console.log(chats);
  if (chats.rows[1]) throw new Error("Chat already exists!");
  const chatID = uuid.v1.generate();

  await client.execute("INSERT INTO chat(id,chat_type) VALUES(?,?)", [
    chatID,
    "individual",
  ]);

  await client.execute(
    "INSERT INTO participance(username,chat_id,participance_type) VALUES(?,?,?),(?,?,?)",
    [participant_1, chatID, "individual", participant_2, chatID, "individual"]
  );
  return { id: chatID, contact: participant_2 };
}

export async function getChats(username) {
  const chatData = await client.execute(
    "SELECT p.* FROM participance p JOIN ( SELECT chat_id FROM participance WHERE username = ? ) AS subquery  ON p.chat_id = subquery.chat_id AND p.username <> ?",
    [username]
  );

  return chatData.rows;
}

export async function insertMessage(data) {
  const now = new Date();
  await client.execute(
    "INSERT INTO message(chat_id,content,sender,creation_time) VALUES(?,?,?,?);",
    [data.chat_id, data.content, data.sender, now]
  );
}

export async function getMessages(chat_id) {
  const messageData = await client.execute(
    "SELECT * FROM message WHERE chat_id=?  ORDER BY id ASC ",
    [chat_id]
  );
  return messageData.rows;
}
