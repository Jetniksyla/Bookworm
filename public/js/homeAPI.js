document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", initiateSearch);
});

async function initiateSearch() {
  const searchInput = document.getElementById("search-input").value.trim();
  if (!searchInput) {
    alert("Please enter a search term before pressing the search button.");
    return;
  }

  hideUIComponents();
  const apiKey = await fetchApiKey();
  if (!apiKey) return; // Stop the process if no API key is found

  searchBook(searchInput, apiKey);
}

async function fetchApiKey() {
  try {
    const response = await fetch("/api/api-key");
    if (!response.ok) throw new Error("Failed to fetch the API key.");
    const { apiKey } = await response.json();
    if (typeof apiKey === "undefined") throw new Error("API key is undefined.");
    return apiKey;
  } catch (error) {
    console.error("Error fetching API key:", error);
    alert("There was a problem fetching the API key. Please try again later.");
  }
}

function hideUIComponents() {
  document.getElementById("carousel").style.display = "none";
  document.querySelector(".book-search-title").style.display = "none";
}

async function searchBook(searchInput, apiKey) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    searchInput
  )}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();

    displayBooks(data);
  } catch (error) {
    console.error("Error searching for books:", error);
  }
}

function displayBooks(data) {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";

  if (!data.items || data.items.length === 0) {
    bookContainer.innerHTML =
      "<p style='color: red; font-size: 26px;'>No books found with that title. Try another search query.</p>";
    return;
  }

  data.items.forEach((item) => createBookCard(item, bookContainer));
}

function createBookCard(item, container) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = item.volumeInfo.title;
  card.appendChild(cardTitle);

  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("src", item.volumeInfo.imageLinks.thumbnail);
    card.appendChild(cardImage);
  }

  const description = document.createElement("p");
  const authorText = item.volumeInfo.authors
    ? `Author: ${item.volumeInfo.authors.join(", ")}`
    : "Author: Unknown";
  const descriptionText =
    item.volumeInfo.description || "No description available.";
  description.innerHTML = `${authorText}<br><br>${descriptionText}`;
  card.appendChild(description);

  const favoriteBtn = document.createElement("button");
  favoriteBtn.textContent = "Add to Favorites";
  favoriteBtn.addEventListener("click", () => handleFavorites(item.volumeInfo));
  card.appendChild(favoriteBtn);

  container.appendChild(card);
}
async function handleFavorites(title, img, author, description, publishedDate) {
  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({ title, img, author, description, publishedDate }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    console.log("Your book has been added to favorites.");
  } else {
    alert(`Failed to add to favorites`);
  }
}

const deleteBtn = document.querySelectorAll(".oneBook");

deleteBtn.forEach((button) =>
  button.addEventListener("click", function (event) {
    const bookId = event.target.dataset.bookId;
    console.log(bookId);
    fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Book deleted successfully");
          event.target.closest(".book").remove();
        } else {
          console.error("Failed to delete the book");
        }
      })
      .catch((error) => console.error("Error:", error));
  })
);

// ------------------------------ Carousel  --  Functions ----------------------------

let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel-image");
const totalImages = images.length;

function showImage(index) {
  images.forEach((img, idx) => {
    img.style.display = idx === index ? "block" : "none";
  });
}

document.getElementById("next").addEventListener("click", function () {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  showImage(currentImageIndex);
});

document.getElementById("back").addEventListener("click", function () {
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  showImage(currentImageIndex);
});

setInterval(function () {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  showImage(currentImageIndex);
}, 4500);

showImage(currentImageIndex);

document.addEventListener("DOMContentLoaded", (event) => {
  function changeImage(containerSelector) {
    const images = document.querySelectorAll(containerSelector);
    let visibleImgIndex = -1;
    images.forEach((img, index) => {
      if (img.style.display === "block") {
        img.style.display = "none";
        visibleImgIndex = index;
      }
    });

    const nextImgIndex = (visibleImgIndex + 1) % images.length;
    images[nextImgIndex].style.display = "block";
  }

  setInterval(() => changeImage(".image-container1 .carousel-image1"), 4750);
  setInterval(() => changeImage(".image-container2 .carousel-image2"), 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("nav-toggle");
  var navbar = document.getElementById("navbar");

  navToggle.addEventListener("click", function () {
    // Toggle navbar visibility
    if (navbar.style.display === "none" || navbar.style.display === "") {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
  });
});
