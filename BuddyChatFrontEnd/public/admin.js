const listMember = document.getElementById("addMembers");
const listAdmin = document.getElementById("makeAdmins");
const groupAdd = document.getElementById("groupAdd");
const addAdmin = document.getElementById("addAdmin");
const groupMembers = document.getElementById("groupMembers");
const membersList = document.getElementById("membersList");
const selectedGroupMembers = document.getElementById("selectedGroupMembers");
const selectedAdmin = document.getElementById("selectedAdmin");
const removeUser = document.getElementById("removeUsers");
const removeMembers = document.getElementById("removeMembers");
const groupUser = document.getElementById("groupUsers");
const removeSelected = document.getElementById("removeSelected");

listMember.addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const friends = await axios.get("http://localhost:3001/user/getUsers", {
      headers: { Authorization: `${token}` },
    });
    groupMembers.innerHTML = "";
    const br = document.createElement("br");
    friends.data.users.forEach((user) => {
      const userName = document.createElement("lable");
      const br = document.createElement("br");
      userName.textContent = `${user.name}  ${user.phone}`;
      groupMembers.appendChild(userName);
      groupMembers.appendChild(br);
    });
    groupAdd.style.display = "block";
    console.log(friends.data.users);
  } catch (error) {
    console.log(error);
    //document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
});

selectedGroupMembers.addEventListener("click", async () => {
  try {
    groupAdd.style.display = "none";
    const addPhone = document.getElementById("addPhone");
    console.log("1");
    const numberToAdd = addPhone.value;
    console.log("2");
    const groupId = localStorage.getItem("groupId");
    console.log("3");
    const response = await axios.post(
      "http://localhost:3001/userGroup/addUser",
      {
        params: { numberToAdd, groupId },
      }
    );
    console.log("4");
  } catch (error) {
    console.log("error in adding members");
    console.log(error);
  }
});

listAdmin.addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const groupId = localStorage.getItem("groupId");
    const friends = await axios.get(
      "http://localhost:3001/userGroup/getNonAdmins",
      {
        headers: { Authorization: `${token}` },
        params: { groupId },
      }
    );
    membersList.innerHTML = "";
    const br = document.createElement("br");
    friends.data.user.forEach((user) => {
      const userName = document.createElement("lable");
      const br = document.createElement("br");
      userName.textContent = `${user.id} ${user.name}  ${user.phone}`;
      membersList.appendChild(userName);
      membersList.appendChild(br);
    });
    addAdmin.style.display = "block";
    console.log(friends);
    selectedAdmin.addEventListener("click", async () => {
      try {
        addAdmin.style.display = "none";
        const adminId = document.getElementById("adminPhone");
        console.log("good1");
        const idToAdd = adminId.value;
        console.log("good2");
        const groupId = localStorage.getItem("groupId");
        console.log("good3");
        const response = await axios.post(
          "http://localhost:3001/userGroup/makeAdmin",
          {
            params: { idToAdd, groupId },
          }
        );
        console.log("good4");
        console.log(response.message);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
    //document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
});

removeUser.addEventListener("click", async () => {
  try {
    const groupId = localStorage.getItem("groupId");
    groupUser.innerHTML = "";
    const br = document.createElement("br");
    const response = await axios.post(
      "http://localhost:3001/userGroup/getUsers",
      {
        params: { groupId },
      }
    );
    response.data.user.forEach((user) => {
      const userName = document.createElement("lable");
      const br = document.createElement("br");
      userName.textContent = `${user.id} ${user.name}  ${user.phone}`;
      groupUser.appendChild(userName);
      groupUser.appendChild(br);
    });
    removeMembers.style.display = "block";
    removeSelected.addEventListener("click", async () => {
      try {
        removeMembers.style.display = "none";
        const removeId = document.getElementById("removePhone");
        console.log("good1");
        const idToRemove = removeId.value;
        console.log("good2");
        const groupId = localStorage.getItem("groupId");
        console.log("good3");
        const response = await axios.post(
          "http://localhost:3001/userGroup/removeUser",
          {
            params: { idToRemove, groupId },
          }
        );
        console.log("good4");
        console.log(response);
      } catch (error) {
        console.log(error);
        console.log("removing request failed");
      }
    });
  } catch (error) {
    console.log("error fetching all group members");
    console.log(error);
  }
});
