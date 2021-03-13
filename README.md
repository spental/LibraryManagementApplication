# Library Management

This application is a tool for librarians to view and manage their database of books and library members.

## Table of Contents

* [Introduction](#Introduction)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Screenshot](#Screenshot)
* [Link](#Link)

## Introduction

 * The Library management application allows librarians to login if they already have an account or sign up if they don't, using passport authentication.
 * After the librarian logs in,the application will display the following:
    * Books :
        Librarian can view all the books from the database.
        Add new book.
        Update an existing book.
        Delete an existing book.
        Search for a book based on ISBN, Author, or Book name.
    * Members :
        Librarian can view all the members of the library.    
        Add new member.
        Update an existing member.
        Delete an existing member.
        Search for a member based on ID, First name, or email.

## Installation

In a web browser, navigate to https://librarymanagement2.herokuapp.com/

* node js 
* Visual Studio Code 1.51.1
* express
* express handlebars
* MySQL
* Sequelizer
* lodash-contrib

## Usage

![Sign up page](./pictures/SignUp.png)

Following the link above will take you to the application's sign up page. You can enter your preferred email and password here to make a new account and generate credentials.

![Log in page](./pictures/Login.png)

After signing up, click on the **Or log in [here](https://librarymanagement2.herokuapp.com/login.html) ** link to navigate to the login page. Enter your email and password into the provided fields and click "LOGIN" to enter.

![Books page](./pictures/BooksPage1.png)

The Books page will initially display all the library's available books. From here, the user can use the search boxes to search for a book based ISBN, Title, or Author.

![Add Book function](./pictures/AddBook.png)

Clicking the "Add Book" button will bring up the Add Book modal, which will allow the user to enter information for a new book. Clicking the "ADD" button on the modal will add that book entry to the database and that book will be visible and searchable in the application. 

Clicking the edit button to the right of any book entry will bring up a similar modal which allows the user to update the information of any book entry.

Clicking the delete button to the right of any book entry will immediately delete that book entry from the database.



## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Screenshot

![image](./public/Assets/pictures/login.png)

![image](./public/Assets/pictures/signup.png)

![image](./public/Assets/pictures/books.png)

![image](./public/Assets/pictures/members.png)

## Link

* Link: https://librarymanagement2.herokuapp.com/

