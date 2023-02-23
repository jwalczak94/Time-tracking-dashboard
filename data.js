"use strict";
const reportData = new Request("data.json");
const reportBoxes = document.querySelectorAll(".report-box");
const btns = document.querySelectorAll(".btn");
let currentBtn = 0;
const frequency = {
  0: "Day",
  1: "Week",
  2: "Month",
};
fetchData();

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    btns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    currentBtn = Number(this.getAttribute("data-value"));
    console.log(currentBtn);
    fetchData();
  });
});

function fetchData() {
  fetch(reportData)
    .then((response) => response.json())
    .then((data) => {
      createBoxes(data.report);
    })
    .catch(console.error);
}

function createBoxes(elements) {
  console.log(currentBtn);
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    const reportResults = document.createElement("div");

    reportResults.classList.add("box");

    reportResults.innerHTML = `
        <h3>${element.title}</h3>
        <span>&#183;&#183;&#183;</span>
        <span>${Object.values(elements[i].timeframes)[currentBtn].current}hrs</span>
        <p>Last ${frequency[currentBtn]} - ${
      Object.values(elements[i].timeframes)[currentBtn].previous
    }hrs</p>`;

    let boxElements = reportBoxes[i].getElementsByClassName("box");
    if (boxElements.length > 0) {
      let oldElement = reportBoxes[i].getElementsByClassName("box")[0];
      reportBoxes[i].removeChild(oldElement);
      reportBoxes[i].appendChild(reportResults);
    } else {
      reportBoxes[i].appendChild(reportResults);
    }
  }
}
