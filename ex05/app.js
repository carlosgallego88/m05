const express = require("express");

const app = express();

const PORT = 3001;


app.get("/", function (request, response) {

    response.status(200).json({
        message: "API Express funcionando"
    });

});


app.get("/api/books", function (request, response) {

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
        }
    ];

    response.status(200).json(books);

});


app.get("/health", function (request, response) {

    response.status(200).json({
        status: "ok"
    });

});


app.use(function (request, response) {

    response.status(404).json({
        error: "Rota não encontrada"
    });

});


app.listen(PORT, function () {

    console.log(
        "Servidor Express a executar na porta " + PORT
    );

});