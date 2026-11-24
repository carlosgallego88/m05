const fs = require("fs");

const file = "books.json";

const command = process.argv[2];


function loadBooks() {

    if (!fs.existsSync(file)) {
        return [];
    }

    const data = fs.readFileSync(file, "utf8");

    if (data.trim() === "") {
        return [];
    }

    return JSON.parse(data);
}


function saveBooks(books) {

    fs.writeFileSync(
        file,
        JSON.stringify(books, null, 4)
    );
}


function addBook() {

    const title = process.argv[3];
    const author = process.argv[4];

    if (!title || !author) {
        console.log("Uso: node app.js add <titulo> <autor>");
        return;
    }

    const books = loadBooks();

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author
    };

    books.push(newBook);

    saveBooks(books);

    console.log("Livro adicionado com sucesso.");
}


function listBooks() {

    const books = loadBooks();

    if (books.length === 0) {
        console.log("Não existem livros.");
        return;
    }

    books.forEach(function (book) {

        console.log(
            book.id +
            " - " +
            book.title +
            " - " +
            book.author
        );
    });
}


function searchBook() {

    const id = Number(process.argv[3]);

    const books = loadBooks();

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (book) {
        console.log(book);
    }
    else {
        console.log("Livro não encontrado.");
    }
}


function updateBook() {

    const id = Number(process.argv[3]);
    const newTitle = process.argv[4];
    const newAuthor = process.argv[5];

    if (!newTitle || !newAuthor) {
        console.log(
            "Uso: node app.js update <id> <titulo> <autor>"
        );
        return;
    }

    const books = loadBooks();

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) {
        console.log("Livro não encontrado.");
        return;
    }

    book.title = newTitle;
    book.author = newAuthor;

    saveBooks(books);

    console.log("Livro atualizado com sucesso.");
}


function removeBook() {

    const id = Number(process.argv[3]);

    const books = loadBooks();

    const newBooks = books.filter(function (book) {
        return book.id !== id;
    });

    if (newBooks.length === books.length) {
        console.log("Livro não encontrado.");
        return;
    }

    saveBooks(newBooks);

    console.log("Livro eliminado com sucesso.");
}


if (command === "add") {

    addBook();
}
else if (command === "list") {

    listBooks();
}
else if (command === "search") {

    searchBook();
}
else if (command === "update") {

    updateBook();
}
else if (command === "remove") {

    removeBook();
}
else {

    console.log("Comandos disponíveis:");
    console.log("add");
    console.log("list");
    console.log("search");
    console.log("update");
    console.log("remove");
}