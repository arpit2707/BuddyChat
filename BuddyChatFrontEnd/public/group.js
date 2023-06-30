const addGroup = document.getElementById("createdGroup");
const groupName = document.getElementById("groupName");
const groupForms = document.getElementById("groupForm");
// //const selectGroup = document.getElementsByClassName("groupList");
const groupForm = document.getElementById("groupForm");
const menu = document.getElementById("menu");
const group = document.getElementById("cGroup");
const createGroup = document.getElementById("group");

menu.addEventListener("click", () => {
  group.classList.toggle("cGroup");
});

createGroup.addEventListener("click", () => {
  groupForm.classList.toggle("createGroupForm");
});

addGroup.addEventListener("click", async () => {
  groupForms.classList.toggle("createGroupForm");
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const groupDetails = {
      name: groupName.value,
    };
    const response = await axios.post(
      "http://localhost:3001/group/newGroup",
      groupDetails,
      {
        headers: { Authorization: `${token}` },
      }
    );
    console.log("Kaha pe response ho raha hai?");
    console.log(response.data.response.id);

    const setGroup = {
      groupId: response.data.response.id,
    };
    const result = await axios.post(
      "http://localhost:3001/userGroup/defaultAdmin",
      setGroup,
      {
        headers: { Authorization: `${token}` },
      }
    );
    console.log(result);
  } catch (error) {
    console.log("Error in setting Admin");
    console.log(error);
  }
});
