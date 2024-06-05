const accideButtonsBlock = document.getElementById("accide_buttons");
const destinationHTML = document.getElementById("inserted");
const extraCssLink = document.getElementById("extra_css");

const fadeIn = [{ opacity: 0 }, { opacity: 1 }];
const animateButton = [
  { backgroundColor: "#9dc08b" },
  { backgroundColor: "#edf1d6" },
];
const timing = { duration: 400, iterations: 1 };
const help_button = document.getElementById("help_button");

let site_data = getSiteData();
let current_lb = {};
let current_lb_btn = null;
let current_accide_btn = null;
help_button.addEventListener("click", helpHandler);
helpHandler();

async function insertBlock(sourceHTML, linkCSS = "") {
  let myObject = await fetch(sourceHTML);
  if (myObject.status == 200) {
    destinationHTML.innerHTML = await myObject.text();
    extraCssLink.href = linkCSS;
    destinationHTML.animate(fadeIn, timing);
  } else {
    destinationHTML.innerHTML = `<p>${myObject.statusText}</p> <br><p>Контент додається</p>`;
    extraCssLink.href = "";
  }
}
async function getSiteData(source = "/project_structure.json") {
  const response = await fetch(source);
  const { data } = await response.json();
  site_data = data;
}

for (button of document.querySelectorAll("button[id^='lb']")) {
  button.addEventListener("click", lbButtonHandler);
}

function setCurrentBtnActive(old_button, new_btn) {
  if (old_button) {
    old_button.parentElement.classList.remove("active");
    old_button.parentElement.animate(animateButton, timing);
  }
  new_btn.parentElement.classList.add("active");
}

function lbButtonHandler(event) {
  current_lb = site_data.labs[event.target.id];
  setCurrentBtnActive(current_lb_btn, event.target);
  current_lb_btn = event.target;
  accideButtonsBlock.innerHTML = "";
  extraCssLink.href = "";
  for (button in current_lb.buttons) {
    createAcideButton(button);
  }
  if (accideButtonsBlock.firstChild) {
    accideButtonsBlock.style.display = "block";
    accideButtonsBlock.firstChild.firstChild.click();
  } else {
    destinationHTML.innerHTML = "<p>Контент додається</p>";
    accideButtonsBlock.style.display = "none";
  }
}

function createAcideButton(button_name) {
  let div_button = document.createElement("div");
  let button_data = current_lb.buttons[button_name];
  div_button.classList.add("nav-item");
  let button = `<button id=${button_name} class="button" type="button"> ${button_data.title}</button>`;
  div_button.innerHTML = button;
  let html_file = current_lb.rel_path + button_data.html_file;
  let css_file = current_lb.rel_path + button_data.css_file;
  let files = { html_file, css_file };
  div_button.firstChild.addEventListener(
    "click",
    acideButtonHandler.bind(files)
  );
  accideButtonsBlock.append(div_button);
}

async function acideButtonHandler(event) {
  await insertBlock(this.html_file, this.css_file);
  setCurrentBtnActive(current_accide_btn, event.target);
  current_accide_btn = event.target;
  current_accide_btn.parentElement.classList.add("active");
  PR.prettyPrint();
}
async function helpHandler() {
  let HTML_file = "./html/help/help.html";
  let CSS_file = "./html/help/help.css";
  accideButtonsBlock.style.display = "none";
  if (current_lb_btn) {
    current_lb_btn.parentElement.classList.remove("active");
  }
  await insertBlock(HTML_file, CSS_file);
}
