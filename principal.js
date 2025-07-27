// adding supabase
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// const supabaseUrl = 'https://your-project-id.supabase.co';
// const supabaseKey = 'your-anon-key';
// const supabase = createClient(supabaseUrl, supabaseKey);



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

// Redirect to department creation page
setTimeout(() => {
  window.location.href = "dept.html";
}, 1000);

    }
  } else {
    updateMsg.textContent = "Password must be at least 4 characters.";
    updateMsg.style.color = "red";
  }
}
// HOD
