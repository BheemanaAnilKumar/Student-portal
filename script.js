
const tbody = document.querySelector("tbody");
let student = data;
student = student.map(transform);

student.forEach(addToTable);

const searchInput = document.querySelector("#search");
const form = document.querySelector("form");

import { data } from "./MOCK_DATA.js";
searchInput.addEventListener("input", filterBySearch);
form.addEventListener("submit", filterBySearch);

function filterBySearch(event) {
  event.preventDefault();
  let value = searchInput.value.trim().toLowerCase();
  if (value.length) {
    // something to filter
    let filtered = student.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value)
    );
    if (filtered.length) {
      filtered.forEach(addToTable);
    } else {
      tbody.innerText = "";
    }
  } else {
    
    student.forEach(addToTable);
  }
}

const sortButtons = document.querySelectorAll(".sort-container > *");
for (let button of sortButtons) {
  button.addEventListener("click", sortData);
}
function sortData(event) {
  let previouslyClicked = document.querySelector(".active");
  if (previouslyClicked) {
    previouslyClicked.classList.toggle("active");
  }
  event.target.classList.toggle("active");
  let id = event.target.id;

  if (id == "ascending") {
    student.sort((a, b) => a.name.localeCompare(b.name));
    student.forEach(addToTable);
  } else if (id == "descending") {
    student.sort((a, b) => b.name.localeCompare(a.name));
    student.forEach(addToTable);
  } else if (id == "marks") {
    student.sort((a, b) => a.marks - b.marks);
    student.forEach(addToTable);
  } else if (id == "passing") {
    let passingStudent = student.filter(
      (student) => student.passing == "Passing"
    );
    passingStudent.forEach(addToTable);
  } else if (id == "classNo") {
    student.sort((a, b) => a.classNo - b.classNo);
    student.forEach(addToTable);
  } else if (id == "gender") {
    student.sort((a, b) => a.gender.localeCompare(b.gender));
    student.forEach(addToTable);
  }
}
function transform(student) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    marks,
    img_src,
    class: classNo,
    passing,
  } = student;

  return {
    id,
    imgSrc: img_src,
    name: first_name + " " + last_name,
    gender,
    classNo,
    marks,
    passing: passing ? "Passing" : "Failed",
    email,
  };
}
function addToTable(student, i) {
  
  if (i == 0) {
    tbody.innerText = "";
  }
  const tr = document.createElement("tr");

  const data = Object.values(student);

  for (let i = 0; i < data.length; i++) {
    if (i == 2) continue;
    if (i == 1) {
      
      const nameTd = document.createElement("td");
      nameTd.innerHTML = `<img src=${student.imgSrc} alt="photo"/> <span>${student.name}</span>`;
      tr.append(nameTd);
    } else {
      const newTd = document.createElement("td");
      newTd.textContent = data[i];
      tr.append(newTd);
    }
  }

  tbody.append(tr);
}