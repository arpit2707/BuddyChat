const send = document.getElementById("sendMessage");
const msg = document.getElementById("msg");
const chatSection = document.getElementById("msgSection");
const adMakeAdmin = document.getElementsByClassName("suAdmin")[0];
const sidebar = document.getElementById("sidebar");

const token = localStorage.getItem("token");

export async function checkAdmin(groupId) {
  try {
    const token = localStorage.getItem("token");
    const payload = token.split(".")[1];
    const decodedPayload = window.atob(payload);
    const decodedToken = JSON.parse(decodedPayload);

    const username = decodedToken.name;
    const id = decodedToken.userId;
    const admin = await axios.get("http://localhost:3001/userGroup/isAdmin", {
      headers: { Authorization: `${token}` },
      params: { groupId, id },
    });
  } catch (error) {
    console.log("Error while checking admin");
    console.log(error);
  }
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
      if (checkAdmin(groupId)) {
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

send.addEventListener("click", async () => {
  try {
    console.log(msg.value);
    let response;
    let groupId = localStorage.getItem("groupId");
    if (groupId === null || undefined) {
      groupId = 1;
    }
    console.log(`What IS GROUP ID ${groupId}`);
    const msgs = {
      msgng: msg.value,
      groupId: groupId,
    };
    response = await axios.post("http://localhost:3001/message/message", msgs, {
      headers: { Authorization: `${token}` },
    });
    msg.value = "";
    //     // }
    addNewMessageToUI(response.data.result);
    console.log(response);
  } catch (error) {
    console.log("Here is the error in send");
    console.log(error);
  }
});

// async function load() {
//   try {
//     let response;
//     // if (localStorage.getItem("groupMsg")) {
//     //   console.log("GROUP ME MSG KHOJNE AA GYA");
//     const groupId = localStorage.getItem("groupId");
//     if (groupId === null || undefined) {
//       groupId = 0;
//     }
//     const groupIdentity = {
//       groupIden: groupId,
//     };
//     console.log(`THis is group ID ${groupId}`);
//     try {
//       response = await axios.get(
//         "http://localhost:3001/message/getAllMessages",
//         {
//           headers: { Authorization: `${token}` },
//           params: { groupId },
//         }
//       );
//       console.log("Here is response");
//       console.log(response);
//     } catch (error) {
//       console.log("Error In Fetching Axios Request");
//       console.log(error);
//     }
//     // } else {
//     //   console.log("BROADCAST ME MSG KHOJNE AA GYA");
//     //   response = await axios.get(
//     //     "http://localhost:3001/message/getAllMessages",
//     //     { headers: { Authorization: `${token}` } }
//     //   );
//     // }
//     chatSection.innerHTML = " ";
//     response.data.response.forEach((element) => {
//       addNewMessageToUI(element);
//     });
//     //console.log(response.data.response);
//   } catch (error) {
//     console.log("Here Is the ERror In Load");
//     console.log(error);
//   }
// }

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
// //setInterval(load, 30000);
