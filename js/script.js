/************************************************
Treehouse FSJS Techdegree:
Project 2 - Data Pagination and Filtering
************************************************/

/***
 * Dear Reviewer,
 * 
 * Thank you for your time! 
 * Your feedback is important to me and crucial to my growth as a developer.
 * With the following code I hope to earn the "Exceeds Expectations" grade, and 
 * I humbly request that you reject my submission if I don't meet those requirements.
 * 
 * Thank you again!
***/


/***
 * @function `showPage`
 * 
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * 
 * @param {array} list  An array of object literals found in js/data.js
 * @param {number} page A number used to calculate pagination
 * 
 * @return none
***/

function showPage(list, page) {
   let startingIndex = page * 9 - 9;
   let endingIndex = page * 9 - 1;
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";
   for (let i = 0; i < list.length; i++) {
      if (i >= startingIndex && i <= endingIndex) {
         const student = list[i];
         const li = createElement("li", "className", "student-item cf");
         const studentDiv = createElement("div", "className", "student-details");
         appendElement(studentDiv, "img", "className", "avatar", "src", student.picture.large, "alt", "Profile Picture");
         appendElement(studentDiv, "h3", "textContent", `${student.name.first} ${student.name.last}`);
         appendElement(studentDiv, "span", "className", "email", "textContent", student.email);
         li.appendChild(studentDiv);
         const detailsDiv = createElement("div", "className", "joined-details");
         appendElement(detailsDiv, "span", "className", "date", "textContent", `Joined ${student.registered.date}`);
         li.appendChild(detailsDiv);
         studentList.appendChild(li);
      }
   }
}


/***
 * @function `addPagination`
 * 
 * This function will create and insert/append the elements needed for the pagination buttons
 * Calls showPage(), passes js/data.js array and a number
 * 
 * @param {array} list An array of object literals found in js/data.js
 * 
 * @return none
***/

function addPagination(list) {
   let pages = Math.ceil(list.length / 9);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   for (let i = 1; i <= pages; i++) {
      const li = createElement("li");
      appendElement(li, "button", "type", "button", "textContent", i);
      linkList.appendChild(li);
   }
   if (pages >= 1) {
      const firstPageButton = linkList.firstElementChild.firstElementChild;
      firstPageButton.className = "active";
   }
   linkList.addEventListener("click", (e) => {
      const buttons = document.getElementsByTagName("BUTTON");
      if (e.target.tagName === "BUTTON") {
         for (let button of buttons) {
            button.className = "";
         }
         e.target.className = "active";
         showPage(list, e.target.textContent);
      }
   });
}


/***
 * @function `createElement`
 * 
 * This function will create elements needed for the showPage() and addPagination() functions
 * 
 * @param {string} elementName HTML element
 * @param {string} property1   HTML element's first property
 * @param {string} value1      HTML element's first property value
 * @param {string} property2   HTML element's second property
 * @param {string} value2      HTML element's second property value
 * @param {string} property3   HTML element's third property
 * @param {string} value3      HTML element's third property value
 * 
 * @return {object} HTML element with up to three property/value pairs
***/

function createElement(elementName, property1, value1, property2, value2, property3, value3) {
   const element = document.createElement(elementName);
   element[property1] = value1;
   if (property2) {
      element[property2] = value2;
   }
   if (property3) {
      element[property3] = value3;
   }
   return element;
}


/***
 * @function `appendElement`
 * 
 * This function will append elements once created with the createElement() function
 * 
 * @param {string} parent Parent node of created element
 * 
 * @return {element} HTML element created by the createElement() function
***/

function appendElement(parent, elementName, property1, value1, property2, value2, property3, value3) {
   const element = createElement(elementName, property1, value1, property2, value2, property3, value3);
   parent.appendChild(element);
   return element;
}


/***
 * Dynamically create/insert the `searchbar` feature
***/

const header = document.querySelector(".header");
const label = createElement("label", "htmlFor", "search", "className", "student-search");
appendElement(label, "span", "textContent", "Search by name");
appendElement(label, "input", "id", "search", "placeholder", "Search by name. . .");
appendElement(label, "button", "type", "button", "innerHTML", `<img src="img/icn-search.svg" alt="Search icon">`);
header.insertAdjacentElement("beforeend", label);
const searchBar = document.querySelector("input");
const searchButton = document.querySelector("button");


/***
 * @function `search`
 * 
 * This function will filter list items based on user input
 * If no list items match input, displays "No Results Found"
 * Calls showPage() and addPagination(), passes a new array - searchList
 * 
 * @param {string} searchInput String to be matched by search results
 * @param {array} list         Array of object literals found in js/data.js
 * 
 * 
 * @return none
***/

function search(searchInput, list) {
   let searchList = [];
   for (let i = 0; i < list.length; i++) {
      student = `${list[i].name.first} ${list[i].name.last}`;
      if (student.toLowerCase().includes(searchInput.value.toLowerCase())) {
         searchList.push(list[i]);
      }  
   }
   showPage(searchList, 1);
   addPagination(searchList);
   if (searchList.length === 0) {
      const linkList = document.querySelector(".link-list");
      linkList.innerHTML = `<h1>No Results Found</h1>`;
   }
}
searchBar.addEventListener("keyup", () => {
   search(searchBar, data);
});
searchButton.addEventListener("click", (e) => {
   search(searchBar, data);
});


// Call functions
showPage(data, 1);
addPagination(data);