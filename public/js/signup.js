// Signup function
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector("#username").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && lastname && email && password) {
    // Send a POST request to the API endpoint

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, lastname, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector("#signupForm")
  .addEventListener("submit", signupFormHandler);
