document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("LogInBtn");
  const signupLink = document.getElementById("Sign");
  const backToTopBtn = document.getElementById("backToTop");

  
  if (loginLink) {
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "login.html"; 
    });
  }


  if (signupLink) {
    signupLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "signup.html";
    });
  }


  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden", "opacity-0");
        backToTopBtn.classList.add("opacity-100");
      } else {
        backToTopBtn.classList.remove("opacity-100");
        backToTopBtn.classList.add("opacity-0");
        setTimeout(() => {
          if (window.scrollY <= 300) {
            backToTopBtn.classList.add("hidden");
          }
        }, 300);
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
