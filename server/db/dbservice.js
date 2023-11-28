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
  const participanceID1 = uuid.v1.generate();
  const participanceID2 = uuid.v1.generate();

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
  if (chats.rows[0]?.chat_id) throw new Error("Chat already exists!");
  const chatID = uuid.v1.generate();

  await client.execute("INSERT INTO chat(id,chat_type) VALUES(?,?)", [
    chatID,
    "individual",
  ]);

  await client.execute(
    "INSERT INTO participance(id,username,chat_id) VALUES(?,?,?),(?,?,?)",
    [
      participanceID1,
      participant_1,
      chatID,
      participanceID2,
      participant_2,
      chatID,
    ]
  );
  return { chat_id: chatID, username: participant_2 };
}

export async function getChats(username) {
  const chatData = await client.execute(
    "SELECT p.username as chat_name, p.chat_id,null as is_admin,? as chat_type FROM participance p JOIN (SELECT chat_id,id FROM participance WHERE username=?) AS subquery ON subquery.chat_id = p.chat_id AND p.username <> ? UNION SELECT g.group_name ,g.chat_id,group_participance.is_admin,? FROM group_chat g JOIN (SELECT chat_id,id FROM participance WHERE username=?)  AS subquery JOIN group_participance ON subquery.id =group_participance.participance_id AND subquery.chat_id=g.chat_id;",
    ["private", username, username, "group", username]
  );
  console.log("ROWS in DB:", chatData.rows);
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
export async function createGroup(session, groupName) {
  const { rows } = await client.execute(
    "SELECT * FROM session WHERE session_id=?",
    [session]
  );
  const participant = rows[0].username;
  const chatID = uuid.v1.generate();
  const participanceID = uuid.v1.generate();

  await client.execute("INSERT INTO chat(id,chat_type) VALUES(?,?)", [
    chatID,
    "group",
  ]);

  await client.execute(
    "INSERT INTO group_chat(chat_id, group_name) VALUES(?,?)",
    [chatID, groupName]
  );
  await client.execute(
    "INSERT INTO participance(id, username,chat_id) VALUES(?,?,?)",
    [participanceID, participant, chatID]
  );

  await client.execute(
    "INSERT INTO group_participance(participance_id, is_admin) VALUES(?,?)",
    [participanceID, true]
  );
  return { chat_id: chatID, chat_name: groupName };
}
export async function getRecievers(chat_id) {
  const { rows } = await client.execute(
    "SELECT p.username FROM participance p WHERE p.chat_id = chat_id",
    [chat_id]
  );
  return rows;
}
