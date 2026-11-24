const express = require("express");

const bcrypt = require("bcryptjs");

const db = require("./database/database");

const app = express();

const PORT = 3001;


app.use(express.json());


app.post("/api/users", function (request, response) {

    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;


    if (!username || !email || !password) {

        return response.status(400).json({
            error: "Username, email e password são obrigatórios"
        });
    }


    if (!email.includes("@")) {

        return response.status(400).json({
            error: "Email inválido"
        });
    }


    if (password.length < 6) {

        return response.status(400).json({
            error: "A password deve ter pelo menos 6 caracteres"
        });
    }


    const existingUser = db.prepare(
        "SELECT * FROM users WHERE username = ? OR email = ?"
    ).get(username, email);


    if (existingUser) {

        return response.status(409).json({
            error: "Username ou email já utilizado"
        });
    }


    const hashedPassword = bcrypt.hashSync(
        password,
        10
    );


    const result = db.prepare(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
    ).run(
        username,
        email,
        hashedPassword
    );


    response.status(201).json({
        id: result.lastInsertRowid,
        username: username,
        email: email
    });

});


app.get("/api/users", function (request, response) {

    const users = db.prepare(
        "SELECT id, username, email FROM users"
    ).all();

    response.status(200).json(users);

});


app.listen(PORT, function () {

    console.log(
        "Servidor de utilizadores na porta " + PORT
    );

});