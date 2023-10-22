function UseMessages() {
  async function getMessages(chatID) {
    try {
      const response = await fetch(
        `http://localhost:8000/chat/messages?chatID=${chatID}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data.messages;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    getMessages,
  };
}
export default UseMessages;
