const myLibrary = {
	books: [],
	currentIndex: 0,
	addBookToLibrary(name, author, publishDate, pages, read) {
		const book = new Book(name, author, publishDate, pages, read);
		this.books.push(book);
	},
	displayLibrary() {
		// Display the library on the DOM and update its content.
		const libraryContainer = document.getElementById("library-container");
		while (this.currentIndex < this.books.length) {
			const book = this.books[this.currentIndex];
			const bookCard = document.createElement("div");
			bookCard.classList.add("book-card");
			bookCard.setAttribute("data-book", this.currentIndex);

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
			readStatus.innerHTML = `<strong>Finished: </strong> ${
				book.read ? "✅" : "❌"
			}`;
			bookCard.appendChild(readStatus);

			// Book options
			const options = document.createElement("div");
			options.classList.add("book-options");
            const deleteOption = document.createElement("div");
            deleteOption.classList.add("option-icon", "delete-book");
            deleteOption.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><use href="#fluent--delete-24-regular"/></svg>`;
            options.appendChild(deleteOption);

            const editReadOption = document.createElement("div");
            editReadOption.classList.add("option-icon", "toggle-read");
            editReadOption.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><use href="#flowbite--edit-outline"/></svg>`;
            options.appendChild(editReadOption);

            bookCard.appendChild(options);

			libraryContainer.appendChild(bookCard);
			this.currentIndex++;
		}
	},
};

function Book(name, author, publishDate, pages, read) {
	this.name = name;
	this.author = author;
	this.publishDate = publishDate;
	this.pages = pages;
	this.read = read;
}

function showErrorMsg(element) {
	const errorMsg = element.nextElementSibling;
	if (element.validity.valueMissing) {
		errorMsg.textContent = "* Missing input value.";
	} else if (element.validity.rangeUnderflow) {
		errorMsg.textContent = "* Invalid number.";
	} else if (element.validity.badInput) {
		errorMsg.textContent = "* Please enter a number.";
	}
}

// Event listener for add book button

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
	myLibrary.displayLibrary();
	e.target.reset();
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

document.getElementById("new-book").addEventListener("click", (e) => {
	const sidebar = document.getElementById("sidebar");

	sidebar.classList.add("shown");
	document.getElementById("new-book").classList.add("hidden");

	// Reset the form
	document.getElementById("book-form").reset();
});

document.getElementById("close-menu").addEventListener("click", (e) => {
	const sidebar = document.getElementById("sidebar");

	sidebar.classList.remove("shown");
	document.getElementById("new-book").classList.remove("hidden");
});

myLibrary.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, false);
myLibrary.addBookToLibrary(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	1997,
	223,
	true
);
myLibrary.addBookToLibrary("Dune", "Frank Herbert", 1965, 412, false);

myLibrary.displayLibrary();
