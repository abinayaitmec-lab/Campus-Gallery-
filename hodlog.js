document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const deptId = document.getElementById('deptId').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMsg = document.getElementById('error');

      const storedUsers = JSON.parse(localStorage.getItem('departments')) || {};

      if (storedUsers[deptId] && storedUsers[deptId].password === password) {
        localStorage.setItem('loggedInDept', deptId); // store session info
        window.location.href = 'hoddash.html'; // redirect to dashboard
      } else {
        errorMsg.textContent = "Invalid Department ID or Password";
      }
    });