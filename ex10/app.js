const express = require("express");

const db = require("./database/database");

const app = express();

const PORT = 3001;


app.use(express.json());


app.get("/api/books", function (request, response) {

    const books = db.prepare(
        "SELECT * FROM books"
    ).all();

    response.status(200).json(books);
});


app.get("/api/books/:id", function (request, response) {

    const book = db.prepare(
        "SELECT * FROM books WHERE id = ?"
    ).get(request.params.id);

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

    const result = db.prepare(
        "INSERT INTO books (title, author) VALUES (?, ?)"
    ).run(title, author);

    const newBook = db.prepare(
        "SELECT * FROM books WHERE id = ?"
    ).get(result.lastInsertRowid);

    response.status(201).json(newBook);
});


app.put("/api/books/:id", function (request, response) {

    const title = request.body.title;
    const author = request.body.author;

    if (!title || !author) {

        return response.status(400).json({
            error: "Título e autor são obrigatórios"
        });
    }

    const result = db.prepare(
        "UPDATE books SET title = ?, author = ? WHERE id = ?"
    ).run(
        title,
        author,
        request.params.id
    );

    if (result.changes === 0) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    const updatedBook = db.prepare(
        "SELECT * FROM books WHERE id = ?"
    ).get(request.params.id);

    response.status(200).json(updatedBook);
});


app.delete("/api/books/:id", function (request, response) {

    const result = db.prepare(
        "DELETE FROM books WHERE id = ?"
    ).run(request.params.id);

    if (result.changes === 0) {

        return response.status(404).json({
            error: "Livro não encontrado"
        });
    }

    response.status(200).json({
        message: "Livro eliminado com sucesso"
    });
});


app.listen(PORT, function () {

    console.log(
        "Servidor ligado à base de dados na porta " + PORT
    );

});