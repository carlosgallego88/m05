const express = require("express");

const app = express();

const PORT = 3001;


app.use(express.json());


function logger(request, response, next) {

    console.log(
        request.method +
        " " +
        request.url
    );

    next();
}


function authentication(request, response, next) {

    const key = request.headers["x-api-key"];

    if (key !== "12345") {

        return response.status(401).json({
            error: "Não autorizado"
        });
    }

    next();
}


function validateBook(request, response, next) {

    const title = request.body.title;
    const author = request.body.author;

    if (!title || !author) {

        return response.status(400).json({
            error: "Título e autor são obrigatórios"
        });
    }

    next();
}


function configurableLogger(enabled) {

    return function (request, response, next) {

        if (enabled) {

            console.log(
                "[LOG] " +
                request.method +
                " " +
                request.url
            );
        }

        next();
    };
}


app.use(logger);

app.use(configurableLogger(true));


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


app.get("/api/books", function (request, response) {

    response.status(200).json(books);

});


app.get(
    "/api/private",
    authentication,
    function (request, response) {

        response.status(200).json({
            message: "Acesso autorizado"
        });
    }
);


app.post(
    "/api/books",
    authentication,
    validateBook,
    function (request, response) {

        const newBook = {
            id: books.length + 1,
            title: request.body.title,
            author: request.body.author
        };

        books.push(newBook);

        response.status(201).json(newBook);
    }
);


app.listen(PORT, function () {

    console.log(
        "Servidor middleware a executar na porta " + PORT
    );

});