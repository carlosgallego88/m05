const express = require("express");

const app = express();

const PORT = 3001;


const books = [
    {
        id: 1,
        title: "Node Basics",
        author: "Carlos"
    },
    {
        id: 2,
        title: "Learning Express",
        author: "Joao"
    },
    {
        id: 3,
        title: "JavaScript Web",
        author: "Carlos"
    }
];


app.get("/api/books", function (request, response) {

    const author = request.query.author;

    if (author) {

        const filteredBooks = books.filter(function (book) {

            return book.author.toLowerCase() === author.toLowerCase();

        });

        return response.status(200).json(filteredBooks);
    }

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


app.use(function (request, response) {

    response.status(404).json({
        error: "Rota não encontrada"
    });

});


app.listen(PORT, function () {

    console.log(
        "Servidor a executar na porta " + PORT
    );

});