const send = document.getElementById("sendMessage");
const msg = document.getElementById("msg");
const chatSection = document.getElementById("msgSection");

const addNewMessageToUI = (data) => {
  const messageElement = document.createElement("span");
  messageElement.textContent = `${data.sender}: ${data.msg}`;
  chatSection.appendChild(messageElement);
  chatSection.appendChild(document.createElement("br"));
};

send.addEventListener("click", async () => {
  //   console.log(msg.value);
  //   console.log(localStorage.getItem("token"));
  try {
    const token = localStorage.getItem("token");
    console.log(msg.value);
    const msgs = {
      msgng: msg.value,
    };
    const response = await axios.post(
      "http://localhost:3001/user/message",
      msgs,
      { headers: { Authorization: `${token}` } }
    );
    msg.value = "";
    addNewMessageToUI(response.data);
    //location.reload();
  } catch (error) {
    console.log(error);
  }
});
