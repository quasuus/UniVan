document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

   

    
    if (email && password) {
      alert("Login exitoso (simulado)");
      window.location.href = "dashboardStudent.html"; 
    } else {
      alert("Por favor, completa todos los campos");
    }
  });
});
