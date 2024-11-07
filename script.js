const myLibrary = [];

function Book(name, author, publishDate, pages) {
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.pages = pages;
}

function addBookToLibrary(name, author, publishDate, pages) {
    const book = new Book (name, author, publishDate, pages);

    myLibrary.push(book);
}

function displayBooks() {
    const libraryContainer = document.getElementById("library-container");
    for (const book of myLibrary) {

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.name;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.innerHTML = `<strong>Author: </strong> ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPublishDate = document.createElement("p");
        bookPublishDate.innerHTML = `<strong>Publish Date: </strong> ${book.publishDate}`;
        bookCard.appendChild(bookPublishDate);

        const bookPages = document.createElement("p");
        bookPages.innerHTML = `<strong>Page Count: </strong> ${book.pages}`;
        bookCard.appendChild(bookPages);


        libraryContainer.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 1997, 223);
addBookToLibrary("Dune", "Frank Herbert", 1965, 412);

displayBooks();

