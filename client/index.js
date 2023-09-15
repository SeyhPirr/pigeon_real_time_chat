const myUsername = prompt("please enter your name") || "Anonymous";

const socket = new WebSocket(
  `ws://localhost:8080/start_web_socket?username=${myUsername}`
);

socket.onmessage = (m) => {
  const data = JSON.parse(m.data);
  if (data.event === "update-users") {
    let userListHtml = "";
    for (const username of data.usernames) {
      userListHtml += `<div> ${username} </div>`;
    }
    document.getElementById("users").innerHTML = userListHtml;
  }
  if (data.event === `send-message`) {
    document.getElementById(
      "conversation"
    ).innerHTML += `<b> ${data.username} </b>: ${data.message} <br>`;
  }
};

window.onload = () => {
  const input = document.getElementById("data");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const message = input.value;
      input.value = "";
      socket.send(
        JSON.stringify({
          event: "send-message",
          message: message,
        })
      );
    }
  });
};
