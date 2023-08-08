let signInMail = document.getElementById("signInMail");
let signInPass = document.getElementById("signInPass");
let showPass = document.getElementById("showPass");
let loginBtn = document.getElementById("loginBtn");
let popUpFail = document.getElementById("popUpFail");
let popUpSuccess = document.getElementById("popUpSuccess");
let noUser = document.getElementById("createUser");
let userName = "";
//array for retrieving data from local storage to sing in
if (localStorage.getItem("users") !== null) {
  usersContainer = JSON.parse(localStorage.getItem("users"));
} else {
  noUser.style.transform = "translate(-50%, 10%)";
}
function loginCheck() {
  for (let i = 0; i < usersContainer.length; i++) {
    if (
      signInMail.value.toLowerCase() === usersContainer[i].email &&
      signInPass.value === usersContainer[i].password &&
      signInMail.value !== "" &&
      signInPass.value !== ""
    ) {
      popUpSuccess.children[0].innerHTML = "Successfully signed in";
      showPopUp(popUpSuccess);
      userName = usersContainer[i].name;
      sessionStorage.setItem("currentUserName", userName);
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 2000);
    } else {
      showPopUp(popUpFail);
    }
  }
}
function showPopUp(pop) {
  pop.style.transform = "translate(-50%, 10%)";
  pop.children[1].style.animationPlayState = "running";
  setTimeout(function () {
    pop.style.transform = "translate(-50%, -150%)";
  }, 2000);
}
//events Controlers
if (showPass) {
  showPass.addEventListener("click", function () {
    if (signInPass.getAttribute("type") === "password") {
      signInPass.setAttribute("type", "text");
      showPass.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      signInPass.setAttribute("type", "password");
      showPass.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", loginCheck);
}
//homepage load
let navToggler = document.getElementById("navToggler");
let popUpLogout = document.getElementById("popUpLogout");
let logoutBtn = document.getElementById("logoutBtn");
let welcomeName = document.getElementById("welcomeName");
// On home page load
let spinnerWrapper = document.querySelector(".lds-ring");
if (spinnerWrapper) {
  window.addEventListener("load", () => {
    spinnerWrapper.style.opacity = "0";
    setTimeout(() => {
      spinnerWrapper.style.display = "none";
    }, 1000);
  });
}
if (welcomeName) {
  let currentUserName = sessionStorage.getItem("currentUserName");
  welcomeName.innerHTML = `Welcome ${currentUserName}`;
}
function showLogout(pop) {
  if (pop.style.transform !== "translate(-50%, 60%)") {
    pop.style.transform = "translate(-50%, 60%)";
  } else {
    pop.style.transform = "translate(-50%, -150%)";
  }
}
function logout() {
  setTimeout(function () {
    window.location.href = "./";
  }, 2000);
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
if (navToggler) {
  navToggler.addEventListener("click", function () {
    showLogout(popUpLogout);
  });
}
