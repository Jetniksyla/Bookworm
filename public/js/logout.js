console.log("JavaScript file loaded");

const logout = async () => {
  try {
    console.log("Logout button clicked");
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("An error occurred during logout.");
  }
};

const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", logout);
