class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() { this.read == "true" ? this.read = "false" : this.read = "true" }
}

const hp = new Book("Harry Potter", "Rowling", 150, "false");
const invMan = new Book("Invisible Man", "Ralph Ellison", 500, "false");
const books = [hp, invMan];

const submitBtn = document.getElementById("form-submit");
const newBookBtn = document.getElementById("new-book-button");

//
const bookForm = document.querySelector(".book-form");
//

// Toggle to show / hide new book form
newBookBtn.addEventListener("click", function() {

/*  bookForm.classList.toggle("visible");*/

  if (bookForm.style.display == "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
  }

});

// Submit form button listener
submitBtn.addEventListener("click", function() {
  addBook(books);
  render(books);
});

function render(books) {
  const mainContainer = document.querySelector(".main-container");
  let booksContainer = document.querySelector(".books-container");
  
  // Removes books container to prevent listing books more than once
  if (booksContainer) { mainContainer.removeChild(booksContainer); }

  booksContainer = document.createElement("table");
  booksContainer.className = "books-container";
  mainContainer.insertAdjacentElement('afterbegin', booksContainer);

  let tableHead = document.createElement("thead");
  booksContainer.insertAdjacentElement('beforeend', tableHead);

  let tableBody = document.createElement("tbody");
  booksContainer.insertAdjacentElement('beforeend', tableBody);

  //
  let titleColumn = document.createElement("th");
  titleColumn.innerHTML = "Title";
  tableHead.insertAdjacentElement('beforeend', titleColumn);

  let authorColumn = document.createElement("th");
  authorColumn.innerHTML = "Author";
  tableHead.insertAdjacentElement('beforeend', authorColumn);

  let pagesColumn = document.createElement("th");
  pagesColumn.innerHTML = "Pages";
  tableHead.insertAdjacentElement('beforeend', pagesColumn);

  let readColumn = document.createElement("th");
  readColumn.innerHTML = "Read";
  tableHead.insertAdjacentElement('beforeend', readColumn);

  let deleteColumn = document.createElement("th");
  deleteColumn.innerHTML = "Delete";
  tableHead.insertAdjacentElement('beforeend', deleteColumn);  


  // Generate the HTML to display each book as an TABLE ROW 
  books.forEach(function(book) {
  	bookRow = document.createElement("tr");

    let bookTitle = document.createElement("td");
    bookTitle.innerHTML = book.title;
    bookRow.insertAdjacentElement('beforeend', bookTitle);

    let bookAuthor= document.createElement("td");
    bookAuthor.innerHTML = book.author;    
    bookRow.insertAdjacentElement('beforeend', bookAuthor);

    let bookPages = document.createElement("td");
    bookPages.innerHTML = String(book.pages).slice(0, 4);
    bookRow.insertAdjacentElement('beforeend', bookPages);

    let bookRead = document.createElement("td");
    bookRead.innerHTML = book.read;
    bookRow.insertAdjacentElement('beforeend', bookRead);

    // Add a delete button for each book
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", function() {

    //	
    booksContainer.removeChild(bookRow);
    const bookToDelete = books.indexOf(book);
    if (bookToDelete > -1) {
    	books.splice(bookToDelete, 1);
    }

    })

    deleteButton.innerHTML = "Delete";

    let bookDelete = document.createElement("td");

    bookDelete.insertAdjacentElement('beforeend', deleteButton);

    bookRow.insertAdjacentElement('beforeend', bookDelete);

    // Enable toggle read on/off
    bookRow.addEventListener("click", function() {
    	book.toggleRead();
    	render(books);
    })

    // Display newly created row
    booksContainer.insertAdjacentElement('beforeend', bookRow);

    // node.className = "book";
    // node.title ="Click to toggle read/not read";                 
    // node.appendChild(textNode);
    // node.appendChild(deleteButton);

    // Listener to toggle read / not read on each book 
    // node.addEventListener("click", function() {
    //   book.toggleRead();
    //   render(books);
    // })

    // Set a different background to each article to improve clarity
    // if (books.indexOf(book) % 2 == 0) { node.style.background = "rgb(205,185,220)"; }
    
    // booksContainer.appendChild(node);

  })
}

function addBook(books) {
  const title = document.getElementById("form-title").value;
  const author = document.getElementById("form-author").value; 
  const pages = document.getElementById("form-pages").value;
  let read = false;
  const readRadios = document.getElementsByName('read');

  readRadios.forEach(function(radio)  {
    if (radio.checked) {
      read = radio.value;
    }
  })

  const newBook = new Book(title, author, pages, read);
  books.push(newBook);
}

render(books);