const myLibrary = {
	books: {},
	currentIndex: -1,
	addBookToLibrary(name, author, publishDate, pages, read) {
		this.currentIndex++;
		const book = new Book(name, author, publishDate, pages, read);
		this.books[this.currentIndex] = book;
		this.displayBook(book);
	},
	displayBook(book) {
		// Display the book on the DOM.

		// Book description
		const libraryContainer = document.getElementById("library-container");
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.setAttribute("data-index", this.currentIndex);

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

		const readStatus = document.createElement("p");
		readStatus.innerHTML = `<strong>Finished: </strong> <span class="read-status">${
			book.read ? "✅" : "❌"
		}</span>`;
		bookCard.appendChild(readStatus);

		// Book options
		const options = document.createElement("div");
		options.classList.add("book-options");
		options.setAttribute("data-index", this.currentIndex);
		const deleteOption = document.createElement("div");
		deleteOption.classList.add("option-icon", "delete-book");
		deleteOption.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><use href="#fluent--delete-24-regular"/></svg>`;
		options.appendChild(deleteOption);

		deleteOption.addEventListener("click", deleteBookHandler);

		const editReadOption = document.createElement("div");
		editReadOption.classList.add("option-icon", "toggle-read");
		editReadOption.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="10)%" viewBox="0 0 24 24"><use href="#eva--checkmark-circle-outline"/></svg>`;
		options.appendChild(editReadOption);

		editReadOption.addEventListener("click", toggleReadHandler);

		bookCard.appendChild(options);

		libraryContainer.appendChild(bookCard);
	},
};

function Book(name, author, publishDate, pages, read) {
	this.name = name;
	this.author = author;
	this.publishDate = publishDate;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

function showErrorMsg(element) {
	const errorMsg = element.nextElementSibling;
	if (element.validity.valueMissing) {
		errorMsg.textContent = "* Missing input value.";
	} else if (element.validity.rangeUnderflow) {
		errorMsg.textContent = "* Invalid number.";
	} else if (element.validity.badInput) {
		errorMsg.textContent = "* Please enter a valid number.";
	}
}

// Event listener for submitting the book form and adding a new book.

document.getElementById("book-form").addEventListener("submit", (e) => {
	e.preventDefault();

	const inputs = document.querySelectorAll("#book-form input");
	const newBook = {};
	let isValid = true;

	inputs.forEach((input) => {
		if (!input.validity.valid) {
			isValid = false;
			input.classList.add("invalid");
			showErrorMsg(input);
		} else {
			const prop = input.getAttribute("name");
			const val = input.type === "checkbox" ? input.checked : input.value;
			input.classList.remove("invalid");

			newBook[prop] = val;
		}
	});
	// If one of the input elements is invalid, return the function.
	if (!isValid) return;

	// Otherwise add the new book and display it
	myLibrary.addBookToLibrary(
		newBook.title,
		newBook.author,
		newBook.publishYear,
		newBook.pages,
		newBook.read
	);
	e.target.reset();
	closeSidebar(null);
});

// Event listeners to validate input elements.

document.querySelectorAll("#book-form input[required]").forEach((input) => {
	input.addEventListener("input", (e) => {
		const errorMsg = e.target.nextElementSibling;
		errorMsg.textContent = "";
	});

	input.addEventListener("blur", (e) => {
		const el = e.target;
		// Show error messages if the input is invalid and the element has been unfocused
		if (!el.validity.valid) {
			el.classList.add("invalid");
			showErrorMsg(el);
		} else {
			el.classList.remove("invalid");
		}
	});
});

// Event listeners for opening and closing the book form menu

document.getElementById("new-book").addEventListener("click", openSidebar);

document.getElementById("close-menu").addEventListener("click", closeSidebar);

myLibrary.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, false);
myLibrary.addBookToLibrary(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	1997,
	223,
	true
);
myLibrary.addBookToLibrary("Dune", "Frank Herbert", 1965, 412, false);

// Event handler function for opening the sidebar menu

function openSidebar(e) {
	const sidebar = document.getElementById("sidebar");

	sidebar.classList.add("shown");
	document.getElementById("new-book").classList.add("hidden");
	document.body.classList.add('sidebar-open');

	// Reset the form
	document.getElementById("book-form").reset();
}

// Event handler function for closing the sidebar menu

function closeSidebar(e) {
	const sidebar = document.getElementById("sidebar");

	sidebar.classList.remove("shown");
	document.getElementById("new-book").classList.remove("hidden");
	document.body.classList.remove('sidebar-open');
}

// Event handler function for removing books from the library

function deleteBookHandler(e) {
	const bookIndex = +this.parentElement.getAttribute("data-index");
	delete myLibrary.books[bookIndex];

	const bookCard = document.querySelector(
		`.book-card[data-index="${bookIndex}"]`
	);
	bookCard.remove();
}

// Event handler function for toggling the read status of a book in the library

function toggleReadHandler(e) {
	const bookIndex = +this.parentElement.getAttribute("data-index");

	myLibrary.books[bookIndex].toggleRead();

	const readStatus = document.querySelector(
		`.book-card[data-index="${bookIndex}"] .read-status`
	);
	readStatus.textContent = myLibrary.books[bookIndex].read ? "✅" : "❌";
}
