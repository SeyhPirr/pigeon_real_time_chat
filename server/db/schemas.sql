use pigeon;
 CREATE TABLE user(
    username VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE session(
    session_id VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY(username) REFERENCES user(username) ON DELETE CASCADE
);

CREATE TABLE chat(
    id VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    chat_type ENUM("individual","group") NOT NULL
);

CREATE TABLE participance(
	id VARCHAR(255) primary key,
    username VARCHAR(255) NOT NULL,
    chat_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(username) REFERENCES user(username),
    FOREIGN KEY(chat_id) REFERENCES chat(id)
);
CREATE TABLE message(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    chat_id VARCHAR(255) NOT NULL,
    sender VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    creation_time VARCHAR(255) NOT NULL,
    FOREIGN KEY(chat_id) REFERENCES chat(id),
    FOREIGN KEY(sender) REFERENCES user(username)
);

CREATE TABLE group_chat(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    chat_id VARCHAR(255) NOT NULL,
    group_name VARCHAR(255) NOT NULL,
    FOREIGN KEY(chat_id) REFERENCES chat(id) 
);
CREATE TABLE group_participance(
participance_id VARCHAR(255) NOT NULL ,
 is_admin BOOLEAN NOT NULL,
 FOREIGN KEY(participance_id) REFERENCES participance(id)
);

