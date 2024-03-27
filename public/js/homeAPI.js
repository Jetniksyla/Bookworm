const apiKey = "AIzaSyDbvvldgLOtmAV7OTzP0cTBAdKhU_AzCh4";
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&key=${apiKey}`;

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const bookContainer = document.getElementById("book-container");

    // Create a new table row element
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = data.items[0].volumeInfo.title;

    const cardImage = document.createElement("img");
    // cardImage.setAttribute("src", data.items[0].imageLinks.smallThumbnail);

    const pTag = document.createElement("p");
    pTag.setAttribute("class", "card-body");
    pTag.textContent = data.items[0].volumeInfo.description;

    card.append(cardTitle, cardImage, pTag);
    bookContainer.appendChild(card);
  })
  .then((protectedData) => {
    // Process the protected data
    console.log("Protected Data:", protectedData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
