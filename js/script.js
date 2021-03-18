/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let pages = Math.round(list.length / 9);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   for (let i = 1; i <= pages; i++) {
      const li = createElement("li");
      appendElement(li, "button", "type", "button", "textContent", i);
      linkList.appendChild(li);
   }
   const firstPageButton = document.querySelector("button");
   firstPageButton.className = "active";
   linkList.addEventListener("click", (e) => {
      const buttons = document.getElementsByTagName("BUTTON");
      if (e.target.tagName === "BUTTON") {
         for (let button in buttons) {
            button.className = "";
         }
         e.target.className = "active";
         showPage(list, e.target.textContent)
      }
   });
}

/*
Create the `createElement` function
This function will create elements needed for the showPage() and addPagination() functions
*/
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

/*
Create the `appendElement` function
This function will append elements once created with the createElement() function
*/
function appendElement(parent, elementName, property1, value1, property2, value2, property3, value3) {
   const element = createElement(elementName, property1, value1, property2, value2, property3, value3);
   parent.appendChild(element);
   return element;
}

// Call functions
showPage(data, 1);
addPagination(data);