function login() {
  const id = document.getElementById('collegeID').value.trim();
  const pass = document.getElementById('collegePassword').value.trim();
  const loginMsg = document.getElementById('loginMsg');

  const colleges = JSON.parse(localStorage.getItem("colleges")) || {};
  const college = colleges[id];

  if (college && pass === college.password) {
    loginMsg.textContent = "Login successful!";
    loginMsg.style.color = "green";
    document.getElementById('loginSection').style.display = "none";
    document.getElementById('changePasswordSection').style.display = "block";
    sessionStorage.setItem("loggedCollegeID", id);
    loadDepartmentList();
  } else {
    loginMsg.textContent = "Invalid ID or password.";
    loginMsg.style.color = "red";
  }
}

function changePassword() {
  const newPass = document.getElementById('newPassword').value.trim();
  const id = sessionStorage.getItem("loggedCollegeID");
  const updateMsg = document.getElementById('updateMsg');

  if (newPass.length >= 4) {
    const colleges = JSON.parse(localStorage.getItem("colleges")) || {};
    if (colleges[id]) {
      colleges[id].password = newPass;
      localStorage.setItem("colleges", JSON.stringify(colleges));
      updateMsg.textContent = "Password updated successfully!";
      updateMsg.style.color = "green";

      document.getElementById('createDepartmentSection').style.display = "block";
      document.getElementById('departmentListSection').style.display = "block";

      loadDepartmentList();
    }
  } else {
    updateMsg.textContent = "Password must be at least 4 characters.";
    updateMsg.style.color = "red";
  }
}

function createDepartment() {
  const deptID = document.getElementById("deptID").value.trim();
  const deptPass = document.getElementById("deptPassword").value.trim();
  const deptMsg = document.getElementById("deptMsg");

  const collegeID = sessionStorage.getItem("loggedCollegeID");

  if (!collegeID) {
    deptMsg.textContent = "Unauthorized access.";
    deptMsg.style.color = "red";
    return;
  }

  if (deptID && deptPass.length >= 4) {
    const departments = JSON.parse(localStorage.getItem("departments")) || {};
    departments[deptID] = {
      collegeID,
      password: deptPass
    };
    localStorage.setItem("departments", JSON.stringify(departments));
    deptMsg.textContent = "Department added successfully!";
    deptMsg.style.color = "green";

    // Update grid after creation
    loadDepartmentList();
  } else {
    deptMsg.textContent = "Invalid input.";
    deptMsg.style.color = "red";
  }
}

function loadDepartmentList() {
  const collegeID = sessionStorage.getItem("loggedCollegeID");
  const departments = JSON.parse(localStorage.getItem("departments")) || {};
  const grid = document.getElementById("departmentGrid");
  const section = document.getElementById("departmentListSection");

  // Clear old items
  grid.innerHTML = "";

  let hasDepartments = false;
  for (const deptID in departments) {
    if (departments[deptID].collegeID === collegeID) {
      const div = document.createElement("div");
      div.className = "grid-item";
      div.textContent = deptID;
      grid.appendChild(div);
      hasDepartments = true;
    }
  }

  if (hasDepartments) {
    section.style.display = "block";
  }
}