const express = require("express");

const app = express();

const PORT = 3001;


app.use(express.json());


let books = [
    {
        id: 1,
        title: "Node Basics",
        author: "Carlos"
    },
    {
        id: 2,
        title: "Learning Express",
        author: "Joao"
    }
];


app.get("/api/books", function (request, response) {

    response.status(200).json(books);

});


app.get("/api/books/:id", function (request, response) {

    const id = Number(request.params.id);

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    response.status(200).json(book);

});


app.post("/api/books", function (request, response) {

    const title = request.body.title;
    const author = request.body.author;

    if (!title || !author) {

        return response.status(400).json({
            error: "Título e autor são obrigatórios"
        });
    }

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author
    };

    books.push(newBook);

    response.status(201).json(newBook);

});


app.put("/api/books/:id", function (request, response) {

    const id = Number(request.params.id);

    const title = request.body.title;
    const author = request.body.author;

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    if (!title || !author) {

        return response.status(400).json({
            error: "Título e autor são obrigatórios"
        });
    }

    book.title = title;
    book.author = author;

    response.status(200).json(book);

});


app.patch("/api/books/:id", function (request, response) {

    const id = Number(request.params.id);

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    if (request.body.title) {
        book.title = request.body.title;
    }

    if (request.body.author) {
        book.author = request.body.author;
    }

    response.status(200).json(book);

});


app.delete("/api/books/:id", function (request, response) {

    const id = Number(request.params.id);

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    books = books.filter(function (book) {
        return book.id !== id;
    });

    response.status(200).json({
        message: "Livro eliminado com sucesso"
    });

});


app.listen(PORT, function () {

    console.log(
        "Servidor CRUD a executar na porta " + PORT
    );

});