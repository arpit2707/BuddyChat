function signUpButton() {
  console.log("Entered signup");
  container.classList.add("right-panel-active");
}

async function signUp(e) {
  try {
    e.preventDefault();
    console.log("entered here");
    console.log("it is" + e.target.userName.value);

    const signUpDetails = {
      name: e.target.userName.value,
      email: e.target.userEmail.value,
      phone: e.target.userNumber.value,
      password: e.target.userPassword.value,
    };

    const response = await axios.post(
      "http://localhost:3001/user/register",
      signUpDetails
    );

    if (response.status === 201 || 200) {
      alert("User Signed Up Successfully");
      window.location.href = "http://localhost:3001";
    } else {
      throw new Error("Failed to singup");
    }
  } catch (err) {
    alert(`${err.response.data.error}`);
  }
}
