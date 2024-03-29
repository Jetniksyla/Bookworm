document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", searchBook)
});

function searchBook(item)
  {
    const searchInput = document.getElementById("search-input").value.trim();
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
        bookContainer.innerHTML = ""; // Clear previous results

        if (!data.items || data.items.length === 0) {
          bookContainer.innerHTML =
            "<p>No books found with that title. Try another search query.</p>";
          return;
        }

        data.items.forEach((item) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          const cardTitle = document.createElement("h2");
          cardTitle.textContent = item.volumeInfo.title;

          const cardAuthor = document.createElement("p");
          cardAuthor.textContent = item.volumeInfo.authors
            ? `Author(s): ${item.volumeInfo.authors.join(", ")}`
            : "Author(s): Unknown";

          const cardImage = document.createElement("img");
          if (
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.thumbnail
          ) {
            cardImage.setAttribute(
              "src",
              item.volumeInfo.imageLinks.thumbnail
            );
          }

          const description = document.createElement("p");
          description.textContent =
            item.volumeInfo.description || "No description available.";
          // Favorite btn for favorite books
          const favoriteBtn = document.createElement("button");
          favoriteBtn.textContent = "Add to Favorites";



          // --------- 
          favoriteBtn.addEventListener("click", function () {
            addToFavorites(item); // this function sends data to your backend
            
            

          });



          card.appendChild(cardTitle);
          if (cardImage.src) {
            // Only append if the src was set
            card.appendChild(cardImage);
          }
          card.appendChild(cardAuthor);
          card.appendChild(description);
          card.appendChild(favoriteBtn);
          bookContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

