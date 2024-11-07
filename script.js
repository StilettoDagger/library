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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 1997, 223);
addBookToLibrary("Dune", "Frank Herbert", 1965, 412);

