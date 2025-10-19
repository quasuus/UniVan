const userTypeSelect = document.getElementById('role');
const form = document.getElementById('signupForm');
 
userTypeSelect.addEventListener('change', () => {
  const conductorFields = document.getElementById('conductor-fields');
  const universitarioFields = document.getElementById('universitario-fields');
 
  if (userTypeSelect.value === 'driver') {
    conductorFields.classList.remove('hidden');
    universitarioFields.classList.add('hidden');
  } else if (userTypeSelect.value === 'student') {
    universitarioFields.classList.remove('hidden');
    conductorFields.classList.add('hidden');
  } else {
    conductorFields.classList.add('hidden');
    universitarioFields.classList.add('hidden');
  }
});
 
form.addEventListener('submit', async function (e) {
  e.preventDefault();
 
  const role = userTypeSelect.value;
  if (!role) {
    alert('Please select your user type.');
    return;
  }
 
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
 
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
 
  if (!nombre || !email || !phone || !password || !confirmPassword || !day || !month || !year) {
    alert('Please fill all required fields.');
    return;
  }
 
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
 
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
 
  if (age < 18) {
    alert('You must be at least 18 years old.');
    return;
  }
 
  const data = {
    role,
    nombre,
    age,
    email,
    phone,
    password
  };
 
  if (role === 'student') {
    const career = document.getElementById('career').value.trim();
    const university = document.getElementById('university').value.trim();
 
    if (!career || !university) {
      alert('Please select your career and university.');
      return;
    }
 
    data.career = career;
    data.university = university;
  } else if (role === 'driver') {
    const type_card = document.getElementById('type_card').value.trim();
    const license_number = document.getElementById('license_number').value.trim();
 
    if (!type_card || !license_number) {
      alert('Please fill vehicle type and license number.');
      return;
    }
 
    data.type_card = type_card;
    data.license_number = license_number;
  }
 
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
 
    const result = await response.json();
 
    if (response.ok) {
      alert(result.message);
      if (role === 'student') {
        window.location.href = 'dashboardStudent.html';
      } else {
        window.location.href = 'dashboardDrivers.html';
      }
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Error de conexión con el servidor.');
    console.error(error);
  }
});