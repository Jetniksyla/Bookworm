// Add an event listener to the form with id "login"
document.querySelector("#login").addEventListener("submit", event => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create an object to store the user input (username and password)
  const userObj = {
      username: document.querySelector("#loginUsername").value,
      password: document.querySelector("#loginPassword").value,
  }

  // Log the user object to the console
  console.log(userObj);

  // Send a POST request to the "/api/users/login" endpoint with the user object as the body
  fetch("/login", {
      method: "POST",
      body: JSON.stringify(userObj), // Convert the user object to JSON format
      headers: {
          "Content-Type": "application/json" // Specify the content type as JSON
      }
  }).then(res => {
      // Check if the response is ok (status code 200)
      if (res.ok) {
          // If successful, log "Logged in" to the console and redirect to the dashboard page
          console.log("Logged in");
          location.href = "/home";
      } else {
          // If unsuccessful, display an alert message
          alert("Try again!");
      }
  });
});
