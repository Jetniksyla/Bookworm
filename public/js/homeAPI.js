document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", searchBook);
});

function searchBook(item) {
  const searchInput = document.getElementById("search-input").value.trim();
  document.getElementById("carousel").style.display = "none";

  if (!searchInput) {
    console.log("Please enter a search term.");
    return;
  }

  const apiKey = "AIzaSyDbvvldgLOtmAV7OTzP0cTBAdKhU_AzCh4";
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    searchInput
  )}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const bookContainer = document.getElementById("book-container");
      bookContainer.innerHTML = "";

      if (!data.items || data.items.length === 0) {
        bookContainer.innerHTML =
          "<p style='color: red; font-size: 26px;'>No books found with that title. Try another search query.</p>";
        return;
      }
      data.items.forEach((item) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const cardTitle = document.createElement("h2");
        cardTitle.textContent = item.volumeInfo.title;

        const cardImage = document.createElement("img");
        if (
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.thumbnail
        ) {
          cardImage.setAttribute("src", item.volumeInfo.imageLinks.thumbnail);
        }

        const description = document.createElement("p");
        // Concatenate author and description into one string with a line break
        const authorText = item.volumeInfo.authors
          ? `Author: ${item.volumeInfo.authors.join(", ")}`
          : "Author: Unknown";
        const descriptionText =
          item.volumeInfo.description || "No description available.";
        description.innerHTML = `${authorText}<br> <br>${descriptionText}`; // Use innerHTML to include HTML tags

        const favoriteBtn = document.createElement("button");
        favoriteBtn.textContent = "Add to Favorites";

        const nextBtn = document.createElement("button");
        nextBtn.setAttribute("id", "nextPage");
        nextBtn.setAttribute("onclick", "getNextPage()");
        nextBtn.textContent = "Load More";

        favoriteBtn.addEventListener("click", function(event) {
          handleFavorites(
              item.volumeInfo.title,
              item.volumeInfo.imageLinks?.thumbnail,
              item.volumeInfo.authors?.join(", "),
              item.volumeInfo.description || "No description available."
          )(event); 
      });
      

        card.appendChild(cardTitle);
        if (cardImage.src) {
          card.appendChild(cardImage);
        }
        card.appendChild(description);
        card.appendChild(favoriteBtn);
        bookContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function handleFavorites(title, img, author, description) {
  return async function (event) {
    event.preventDefault();

    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({ title, img, author, description }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("Your book has been added to favorites.");
    } else {
      const errorText = await response.text();
      alert(`Failed to add to favorites: ${errorText}`);
    }
  };
}

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
