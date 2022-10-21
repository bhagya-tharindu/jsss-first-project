let form = document.querySelector(".grocery-form");
let id = document.getElementById("grocery");
let grocerylist = document.querySelector(".grocery-list");
let grocerycontainer = document.querySelector(".grocery-container");
let alerter = document.querySelector(".alert");
let submitbtn = document.querySelector(".submit-btn");
let clearbtn = document.querySelector(".clear-btn");

let editelement;
editbt = false;
editid = ``;
form.addEventListener("submit", submitform);
window.addEventListener("DOMContentLoaded", setupItems);

function submitform(e) {
  e.preventDefault();
  let value = id.value;
  let uni = new Date().getTime().toString();
  if (value && !editbt) {
    const hed = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = uni;
    hed.setAttributeNode(attr);
    hed.classList.add("grocery-item");
    hed.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    let editer = hed.querySelector(".edit-btn");
    editer.addEventListener("click", editbutton);
    let delbtn = hed.querySelector(".delete-btn");
    delbtn.addEventListener("click", delbutton);
    grocerylist.appendChild(hed);
    let ssss = document.querySelector(".grocery-item");
    console.log(ssss.dataset);
    alertfunc("value entered", "success");
    grocerycontainer.classList.add("show-container");
    addToLocalStorage(uni, value);
    settodefault();
  } else if (value && editbt) {
    editelement.innerHTML = value;
    alertfunc("value edited", "success");
    editLocalStorage(editid, value);
    settodefault();
  } else {
    alertfunc("please enter value", "danger");
  }
}

function alertfunc(text, type) {
  alerter.textContent = `${text}`;
  alerter.classList.add(`alert-${type}`);
  setTimeout(function () {
    alerter.textContent = ``;
    alerter.classList.remove(`alert-${type}`);
  }, 1000);
}

function settodefault() {
  id.value = ``;
  editbt = false;
  editid = ``;
  submitbtn.textContent = "submit";
}
function delbutton(e) {
  let parent = e.currentTarget.parentElement.parentElement;
  const passer = parent.dataset.id;
  grocerylist.removeChild(parent);
  alertfunc("item removed", "success");
  if (grocerylist.children.length <= 0) {
    grocerycontainer.classList.remove("show-container");
  }
  settodefault();
  removeFromLocalStorage(passer);
}

function editbutton(e) {
  let element = e.currentTarget.parentElement.parentElement;
  editelement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editelement.textContent);
  id.value = editelement.innerHTML;
  submitbtn.textContent = `edit`;
  editbt = true;
  editid = element.dataset.id;
  console.log(editid);
}

clearbtn.addEventListener("click", function (e) {
  let vars = document.querySelectorAll(".grocery-item");
  console.log(vars);
  if (vars.length > 0) {
    vars.forEach(function (item) {
      grocerylist.removeChild(item);
    });
  }
  grocerycontainer.classList.remove("show-container");
  alertfunc("items cleared", "success");
  settodefault();
  localStorage.removeItem("list");
});

function addToLocalStorage(uni, value) {
  const grocery = { id: uni, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, val) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = val;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    grocerycontainer.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const hed = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  hed.setAttributeNode(attr);
  hed.classList.add("grocery-item");
  hed.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  let editer = hed.querySelector(".edit-btn");
  editer.addEventListener("click", editbutton);
  let delbtn = hed.querySelector(".delete-btn");
  delbtn.addEventListener("click", delbutton);
  grocerylist.appendChild(hed);
}
