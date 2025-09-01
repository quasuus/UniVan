const userTypeSelect = document.getElementById('user-type');
const form = document.getElementById('signupForm');

userTypeSelect.addEventListener('change', () => {
  const conductorFields = document.getElementById('conductor-fields');
  const universitarioFields = document.getElementById('universitario-fields');

  if (userTypeSelect.value === 'conductor') {
    conductorFields.classList.remove('hidden');
    universitarioFields.classList.add('hidden');
  } else if (userTypeSelect.value === 'universitario') {
    universitarioFields.classList.remove('hidden');
    conductorFields.classList.add('hidden');
  } else {
    conductorFields.classList.add('hidden');
    universitarioFields.classList.add('hidden');
  }
  
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById('age').value);
  const userType = userTypeSelect.value;

  if (isNaN(age) || age < 18) {
    alert('You must be at least 18 years old to sign up.');
    return;
  }

  if (userType === 'conductor') {
    window.location.href = 'dashboardDrivers.html';
  } else if (userType === 'universitario') {
    window.location.href = 'dashboardStudent.html';
  } else {
    alert('Please select your user type.');
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById('age').value);
  const userType = userTypeSelect.value;

  if (isNaN(age) || age < 18) {
    alert('You must be at least 18 years old to sign up.');
    return;
  }

  if (userType === 'conductor') {
    localStorage.setItem('userRole', 'driver');  // Guarda el rol conductor
    window.location.href = 'dashboardDrivers.html';
  } else if (userType === 'universitario') {
    localStorage.setItem('userRole', 'student'); // Guarda el rol estudiante
    window.location.href = 'dashboardStudent.html';
  } else {
    alert('Please select your user type.');
  }
});