document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("userRole", data.role);
          localStorage.setItem("userName", data.name);

          if (data.role === "student") {
            window.location.href = "dashboardStudent.html";
          } else if (data.role === "driver") {
            window.location.href = "dashboardDrivers.html";
          }
        }
      })
      .catch(err => {
        console.error("Error al conectar al backend:", err);
        alert("Hubo un error al intentar iniciar sesión.");
      });
  });
});

