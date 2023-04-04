
let students = [ 
{ id: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
{ id: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
{ id: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' } 
];
  

function displayStudents() {
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = "";
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td><button type="button" class="edit-student" data-index="${i}">Edit</button></td>
        <td><button type="button" class="delete-student" data-index="${i}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    }
  }
  
  function addStudent(event) {
    event.preventDefault();
    const id = students.length + 1;
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const grade = document.querySelector("#grade").value;
    const degree = document.querySelector("#degree").value;
    const email = document.querySelector("#email").value;
    const student = {id, name, age, grade, degree, email};
    students.push(student);
    displayStudents();
    document.querySelector("#student-form").reset();
  }
  
  function deleteStudent(event) {
    const index = event.target.dataset.index;
    students.splice(index, 1);
    displayStudents();
  }
  
  function editStudent(event) {
    const index = event.target.dataset.index;
    const student = students[index];
    document.querySelector("#name").value = student.name;
    document.querySelector("#age").value = student.age;
    document.querySelector("#grade").value = student.grade;
    document.querySelector("#degree").value = student.degree;
    document.querySelector("#email").value = student.email;
    document.querySelector("#add-student").style.display = "none";
    document.querySelector("#edit-details").style.display = "block";
    document.querySelector("#edit-details").dataset.index = index;
  }

  function saveDetails(event) {
    event.preventDefault();
    const index = event.target.dataset.index;
    const student = students[index];
    student.name = document.querySelector("#name").value;
    student.age = document.querySelector("#age").value;
    student.grade = document.querySelector("#grade").value;
    student.degree = document.querySelector("#degree").value;
    student.email = document.querySelector("#email").value;
    displayStudents();
    document.querySelector("#student-form").reset();
    document.querySelector("#add-student").style.display = "block";
    document.querySelector("#edit-details").style.display = "none";
  }
  

  function searchStudent() {
    const searchText = document.querySelector("#search").value.toLowerCase();
    const filteredStudents = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.degree.toLowerCase().includes(searchText)
      );
    });
    students = filteredStudents;
    displayStudents();
  }
  
  document.querySelector("#student-form").addEventListener("submit", addStudent);
  document.querySelector("#search").addEventListener("input", searchStudent);
  document.querySelector("#student-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-student")) {
      deleteStudent(event);
    } else if (event.target.classList.contains("edit-student")) {
      editStudent(event );
    } else if (event.target.id === "edit-details") {
      saveDetails(event);
    }
  });
  