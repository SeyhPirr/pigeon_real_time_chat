 CREATE TABLE user(
    username VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE message(
    id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender VARCHAR(255)  NOT NULL ,
    chat_id VARCHAR(255) NOT NULL,
    content TEXT,   
    FOREIGN KEY(sender) REFERENCES user(username) ON DELETE CASCADE ,
    FOREIGN KEY(chat_id) REFERENCES chat(id) ON DELETE CASCADE
);

CREATE TABLE session(
    session_id VARCHAR(500) UNIQUE NOT NULL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY(username) REFERENCES user(username) ON DELETE CASCADE
);

CREATE TABLE chat_participance(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    chat_id VARCHAR(255) NOT NULL,
    participant VARCHAR(255) NOT NULL,
    FOREIGN KEY(chat_id) REFERENCES chat(id) ON DELETE CASCADE ,
    FOREIGN KEY(participant) REFERENCES user(username) ON DELETE CASCADE 
);

CREATE TABLE group_chat(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
);


CREATE TABLE group_participance(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    group_chat_id VARCHAR(255) NOT NULL,
    participant VARCHAR(255) NOT NULL,
    FOREIGN KEY(group_chat_id) REFERENCES group_chat(id) ON DELETE CASCADE ,
    FOREIGN KEY(participant) REFERENCES user(username) ON DELETE CASCADE 
);

CREATE TABLE group_message(
    id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender VARCHAR(255)  NOT NULL ,
    group_chat_id VARCHAR(255) NOT NULL,
    content TEXT,   
    FOREIGN KEY(sender) REFERENCES user(username) ON DELETE CASCADE ,
    FOREIGN KEY(group_chat_id) REFERENCES group(id) ON DELETE CASCADE
);