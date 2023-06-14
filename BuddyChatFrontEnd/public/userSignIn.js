function signInButton() {
  container.classList.remove("right-panel-active");
}

async function signIn(e) {
  try {
    e.preventDefault();
    const signInDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(signInDetails);
    const response = await axios.post(
      "http://localhost:3001/user/login",
      signInDetails
    );
    console.log("Login ho gya");
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    console.log(
      "sign in me token create hokar aa gya::" + localStorage.getItem("token")
    );
    window.location.href = "/user/verified-user";
  } catch (err) {
    console.log(err);
    // document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
}
