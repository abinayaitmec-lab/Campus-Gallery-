const collegeForm = document.getElementById('collegeForm');
const collegeList = document.getElementById('collegeList');
const usedIDs = new Set();

function generateUniqueCollegeID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id;
  do {
    id = 'CLG-' + Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  } while (usedIDs.has(id));
  usedIDs.add(id);
  return id;
}

collegeForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const collegeName = document.getElementById('collegeName').value.trim();
  const collegePassword = document.getElementById('collegePassword').value.trim();

  if (collegeName && collegePassword) {
    const collegeID = generateUniqueCollegeID();

    // Save credentials to localStorage
    const colleges = JSON.parse(localStorage.getItem("colleges")) || {};
    colleges[collegeID] = {
      name: collegeName,
      password: collegePassword
    };
    localStorage.setItem("colleges", JSON.stringify(colleges));

    const li = document.createElement('li');
    li.textContent = `Name: ${collegeName} | ID: ${collegeID} | Password: ${collegePassword}`;
    collegeList.appendChild(li);

    document.getElementById('collegeName').value = '';
    document.getElementById('collegePassword').value = '';
  }
});
