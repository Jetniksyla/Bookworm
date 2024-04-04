# Bookworm

## Description

Bookworm is a comprehensive full-stack application designed to facilitate the discovery and sharing of books among users. It leverages a Node.js and Express.js backend with Sequelize ORM for database management, and Handlebars.js for dynamic page rendering. This platform stands out by incorporating user authentication, allowing users to add books to their favorites, and providing a seamless, interactive user experience.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Authors and Acknowledgments](#authors-and-acknowledgments)
- [License](#license)

## Features

- **User Authentication:** Secure signup and login functionality, including session management.
- **Interactive Book Search:** Users can search for books and view detailed information.
- **Favorites List:** Users can save books to their personal favorites list for easy access.
- **Responsive Design:** A polished UI that is fully responsive, ensuring a great experience on all devices.

## Technology Stack

- **Node.js & Express.js:** For server-side logic and API routes.
- **MySQL & Sequelize ORM:** For database management and schema definition.
- **Handlebars.js:** For dynamic content rendering on the server side.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine to run server-side code.
- **MySQL:** Required for database operations; ensure MySQL is installed and running.

### Installation

1.  Clone the repository using `git clone https://github.com/Jetniksyla/book-sharing-platform.git`.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` to install dependencies from npm.
4.  Copy the `.env.EXAMPLE` file to a new file named `.env` and update it with your specific environment variables.

## Usage

After completing the installation steps, you're ready to start using Bookworm. Here's how to get started:

1. **Starting the Server**

   - With the dependencies installed and your .env file set up, you're ready to launch the application. Navigate to your project directory in the terminal, if you're not already there.
   - Run npm start to start the server. If your package.json scripts are configured to use node server.js for the start command, this will boot up your application.

2. **Accessing the Platform**

   - Open your web browser and visit http://localhost:3001. This will take you to Bookworm's homepage.
   - If you see a welcome page or the main interface of the application, the server is running correctly!

   ![Screenshot of the Book Sharing Platform, showcasing the home page with search functionality.](./public/images/Homepage.png)

3. **Exploring Features**
   - **_Create an Account or Log In:_** To take full advantage of the platform's features, including adding books to your favorites, you'll need to create an account or log in. Click on the "Signup" or "Login" navigation links to access these features.
   - **_Searching for Books:_** Use the search bar on the home page to find books. You can search by title, author, or keywords.
   - **_Adding to Favorites:_** When logged in, you can add books to your favorites list for later by clicking the "Add to Favorites" button on a book's detail page.
   - **_Viewing Favorites:_** Access your list of favorite books at any time by clicking on "Favorites" in the navigation menu.

## Contributing

Your contributions are what make the community incredible. If you have an idea for improving this project, please fork the repository and create a pull request, or open an issue with your suggestions. For substantial changes, please open an issue first to discuss what you would like to change.

## Deployment

This application is deployed on Heroku. You can access it [here](https://search-book-application-dd0c88dd233b.herokuapp.com/).

## Authors and Acknowledgments

- **Jayson Nunez** - _Initial work_ - [GitHub](https://github.com/JaysonNunez1)
- **Jetnik Syla** - _Project Lead & Full Stack Development_ - [GitHub](https://github.com/Jetniksyla)
- **Katy Totah** - _Initial work_ - [GitHub](https://github.com/ktotah)
- **Kim Tung** - _Initial work_ - [GitHub](https://github.com/ktung2018)
- **Owen Wang** - _Initial work_ - [GitHub](https://github.com/owen8955)

Special thanks to everyone who has contributed to making this project a success.

## License

This project is released under the [Apache License Version 2.0, January 2004](/LICENSE).
