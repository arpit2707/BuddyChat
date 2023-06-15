const send = document.getElementById("sendMessage");
const msg = document.getElementById("msg");
const chatSection = document.getElementById("msgSection");

const addNewMessageToUI = (data) => {
  const messageElement = document.createElement("h3");
  messageElement.textContent = `${data.phone}: ${data.msg}`;
  chatSection.appendChild(messageElement);
  const timeElement = document.createElement("h6");
  timeElement.textContent = `${data.createdAt}`;
  chatSection.appendChild(timeElement);
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
    location.reload();
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:3001/message/getAllMessages",
      { headers: { Authorization: `${token}` } }
    );
    console.log(response.data.response);
    response.data.response.forEach((element) => {
      addNewMessageToUI(element);
    });
  } catch (error) {
    console.log(error);
  }
});
