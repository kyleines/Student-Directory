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
         const li = document.createElement("li");
         li.className = "student-item cf";

         const studentDiv = document.createElement("div");
         studentDiv.className = "student-details";
         const img = document.createElement("img");
         img.className = "avatar";
         img.src = student.picture.large;
         img.alt = "Profile Picture";
         studentDiv.appendChild(img);
         const studentName = document.createElement("h3");
         studentName.textContent = `${student.name.first} ${student.name.last}`;
         studentDiv.appendChild(studentName);
         const emailSpan = document.createElement("span");
         emailSpan.className = "email";
         emailSpan.textContent = student.email;
         studentDiv.appendChild(emailSpan);
         li.appendChild(studentDiv);
         
         const detailsDiv = document.createElement("div");
         detailsDiv.className = "joined-details";
         const joinedSpan = document.createElement("span");
         joinedSpan.className = "date";
         joinedSpan.textContent = `Joined ${student.registered.date}`;
         detailsDiv.appendChild(joinedSpan);
         li.appendChild(detailsDiv);

         studentList.appendChild(li);
      }
   }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);