let nameInput = document.getElementById("nameInput");
let mobileInput = document.getElementById("mobileInput");
let mailInput = document.getElementById("mailInput");
let passInput = document.getElementById("passInput");
let inputBox = document.querySelector(".input-box");
let nameRegex = /^[A-z]{4,} *[A-z]*$/;
let mobileRegex = /^(\+2|002)?01[0125]\d{8}$/;
let mailRegex = /^\w+@[a-z]+\.[a-z0-9]{2,}$/;
let passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
let popUpFail = document.getElementById("popUpFail");
let popUpSuccess = document.getElementById("popUpSuccess");
let allRequired = document.getElementById("allRequired");
let alerts = document.querySelectorAll(".alert-group");
let submitBtn = document.querySelector("#submitBtn");
let showPass = document.getElementById("showPass");
// array for storing users obj data
let usersContainer = [];
if (localStorage.getItem("users") !== null) {
  usersContainer = JSON.parse(localStorage.getItem("users"));
}
//add users function to use it when click submit
function addUser() {
  for (let i = 0; i < usersContainer.length; i++) {
    if (mailInput.value.toLowerCase() === usersContainer[i].email) {
      showPopUp(popUpFail);
      return;
    }
  }
  if (
    validate(nameInput, nameRegex, alerts[0]) &&
    validate(mobileInput, mobileRegex, alerts[1]) &&
    validate(mailInput, mailRegex, alerts[2]) &&
    validate(passInput, passRegex, alerts[3])
  ) {
    let user = {
      name: nameInput.value,
      mobile: mobileInput.value,
      email: mailInput.value,
      password: passInput.value,
    };
    usersContainer.push(user);
    localStorage.setItem("users", JSON.stringify(usersContainer));
    showPopUp(popUpSuccess);
    setTimeout(() => {
      window.location.href = "./";
    }, 2500);
  }
  else{
    showPopUp(allRequired);
  }
}
// validate to return boolean value and appear alerts for validity
function validate(element, regex, alertElement) {
  let isValid = regex.test(element.value);
  if (element !== passInput) {
    element.classList.toggle("box-success", isValid);
    element.classList.toggle("box-fail", !isValid);
    alertElement.classList.toggle("hidden", isValid);
  } else {
    inputBox.classList.toggle("box-success", isValid);
    inputBox.classList.toggle("box-fail", !isValid);
    alertElement.classList.toggle("hidden", isValid);
  }
  return isValid;
}
// pop func to appear when all is right or false
function showPopUp(pop) {
  pop.style.transform = "translate(-50%, 10%)";
  pop.children[1].style.animationPlayState = "running";
  setTimeout(function () {
    pop.style.transform = "translate(-50%, -150%)";
  }, 2000);
}
// events controlers
nameInput.addEventListener("input", () => {
  validate(nameInput, nameRegex, alerts[0]);
});
mobileInput.addEventListener("input", () => {
  validate(mobileInput, mobileRegex, alerts[1]);
});
mailInput.addEventListener("input", () => {
  validate(mailInput, mailRegex, alerts[2]);
});
passInput.addEventListener("input", () => {
  validate(passInput, passRegex, alerts[3]);
});
showPass.addEventListener("click", function () {
  if (passInput.getAttribute("type") === "password") {
    passInput.setAttribute("type", "text");
    showPass.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passInput.setAttribute("type", "password");
    showPass.classList.replace("fa-eye-slash", "fa-eye");
  }
});
submitBtn.addEventListener("click", addUser);
