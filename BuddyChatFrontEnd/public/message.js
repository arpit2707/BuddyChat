const send = document.getElementById("sendMessage");
const msg = document.getElementById("msg");
const chatSection = document.getElementById("msgSection");
const adMakeAdmin = document.getElementsByClassName("suAdmin")[0];
const sidebar = document.getElementById("sidebar");
const fileInput = document.getElementById("fileInput");

const token = localStorage.getItem("token");

export async function checkAdmin(groupId) {
  try {
    const token = localStorage.getItem("token");
    const payload = token.split(".")[1];
    const decodedPayload = window.atob(payload);
    const decodedToken = JSON.parse(decodedPayload);
    console.log("Ayya to admin check karne");
    const username = decodedToken.name;
    const id = decodedToken.userId;
    const admin = await axios.get("http://localhost:3001/userGroup/isAdmin", {
      headers: { Authorization: `${token}` },
      params: { groupId, id },
    });
    if (admin.data.result.isAdmin !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error while checking admin");
    console.log(error);
  }
}
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url);
}
function isVideo(url) {
  return /\.(mp4|mov|avi|wmv|mkv|flv|)$/i.test(url);
}
function isAudio(url) {
  return /\.(mp3|m4A|flac|mp4|wav|wma|aac)$/i.test(url);
}
const addNewMessageToUI = (data) => {
  try {
    const messageElement = document.createElement("h3");
    messageElement.textContent = `${data.phone}: ${data.msg}`;
    chatSection.appendChild(messageElement);
    const timeElement = document.createElement("h6");
    timeElement.textContent = `${data.createdAt}`;
    chatSection.appendChild(timeElement);
    chatSection.appendChild(document.createElement("br"));
    console.log(data);
    if (data.fileURL) {
      if (isImage(data.fileURL)) {
        var elem = document.createElement("img");
        elem.setAttribute("src", `${data.fileURL}`);
        elem.setAttribute("height", "70");
        elem.setAttribute("width", "70");
        chatSection.appendChild(elem);
        elem.addEventListener("click", () => {
          var a = document.createElement("a");
          a.href = data.fileURL;
          a.download = "media.jpeg";
          a.click();
        });
      } else if (isVideo(data.fileURL)) {
        var elem = document.createElement("video");
        elem.setAttribute("src", `${data.fileURL}`);
        elem.setAttribute("height", "100");
        elem.setAttribute("width", "150");
        chatSection.appendChild(elem);
        elem.addEventListener("click", () => {
          var a = document.createElement("a");
          a.href = data.fileURL;
          a.download = "media.mp4";
          a.click();
        });
      } else if (isAudio(data.fileURL)) {
        var elem = document.createElement("audio");
        elem.setAttribute("src", `${data.fileURL}`);
        elem.setAttribute("height", "70");
        elem.setAttribute("width", "70");
        chatSection.appendChild(elem);
        elem.addEventListener("click", () => {
          var a = document.createElement("a");
          a.href = data.fileURL;
          a.download = "media.mp3";
          a.click();
        });
      }
    }
  } catch (error) {
    console.log("Here is the error in addNewMessageToUI");
    console.log(error);
  }
};

const addGroupsToUI = async (data) => {
  try {
    const msgType = document.getElementById("msgType");
    const groupElement = document.createElement("div");
    const groupButton = document.createElement("button");
    const groupId = data.id;
    groupButton.id = groupId;
    groupButton.className = "groupList";
    groupButton.textContent = data.name;
    groupElement.appendChild(groupButton);
    sidebar.appendChild(groupElement);
    groupButton.addEventListener("click", async (event) => {
      msgType.textContent = data.name;
      console.log(groupId);
      localStorage.setItem("groupId", groupId);
      const response = await axios.get(
        "http://localhost:3001/message/getAllMessages",

        { headers: { Authorization: `${token}` }, params: { groupId } }
      );

      messageLoading(response);
      console.log("Here is all msg fetched response");
      console.log(response);
      //     // Add your desired functionality here
      const admins = await checkAdmin(groupId);
      if (admins) {
        console.log("Coming here");
        console.log(adMakeAdmin);
        adMakeAdmin.style.display = "block";
      }
    });
  } catch (error) {
    console.log("Here is the error addGroupstoui");
    console.log(error);
  }
};

const groupLoading = async () => {
  const responseGroup = await axios.get(
    "http://localhost:3001/group/getGroups",
    {
      headers: { Authorization: `${token}` },
    }
  );
  sidebar.innerHTML = "";
  console.log("Aage Badha");
  responseGroup.data.result.forEach((element) => {
    console.log(element);
    addGroupsToUI(element);
  });
};

const messageLoading = async (result) => {
  chatSection.innerHTML = " ";
  result.data.response.forEach((element) => {
    addNewMessageToUI(element);
  });
};

msg.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission if the input is wrapped in a form element
    send.click(); // Trigger the click event of the send button
  }
});

// const socket = io();
// socket.on("connect", () => {
//   console.log(`connected with the id ${socket.id}`);
// });
// socket.on("messageSent", (data) => {
//   // Update all instances with the new message
//   console.log("nnoooooooooooo");
//   addNewMessageToUI(data);
// });

// function uploadFile(file) {
//   const formData = new FormData();
//   formData.append("file", file);
//   return formData;
// }
send.addEventListener("click", async () => {
  try {
    console.log(msg.value);
    let response;
    let groupId = localStorage.getItem("groupId");
    if (groupId === null || undefined) {
      groupId = 1;
    }
    console.log(`What IS GROUP ID ${groupId}`);
    const file = fileInput.files[0];
    const msgs = new FormData();
    if (file) {
      msgs.append("file", file);
    }
    msgs.append("msgng", msg.value);
    msgs.append("groupId", groupId);
    response = await axios.post("http://localhost:3001/message/message", msgs, {
      headers: { Authorization: `${token}` },
      "Content-Type": "multipart/form-data",
    });
    // socket.emit("sendMessage", msgs);
    msg.value = "";
    fileInput.value = "";
    //     // }
    addNewMessageToUI(response.data.result);
  } catch (error) {
    console.log("Here is the error in send");
    console.log(error);
  }
});

async function load() {
  try {
    let response;
    const groupId = localStorage.getItem("groupId");
    if (groupId === null || undefined) {
      groupId = 1;
    }
    const groupIdentity = {
      groupIden: groupId,
    };

    try {
      response = await axios.get(
        "http://localhost:3001/message/getAllMessages",
        {
          headers: { Authorization: `${token}` },
          params: { groupId },
        }
      );
    } catch (error) {
      console.log("Error In Fetching Axios Request");
      console.log(error);
    }
    chatSection.innerHTML = " ";
    response.data.response.forEach((element) => {
      addNewMessageToUI(element);
    });
  } catch (error) {
    console.log("Here Is the ERror In Load");
    console.log(error);
  }
}

// menu.addEventListener("click", () => {
//   group.classList.toggle("cGroup");
// });

// createGroup.addEventListener("click", () => {
//   groupForm.classList.toggle("createGroupForm");
// });
window.onload = async () => {
  // localStorage.setItem("groupId", 0);
  //load();
  groupLoading();
};
setInterval(load, 10000);
