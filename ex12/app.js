const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./database/database");

const app = express();

const PORT = 3001;


app.use(express.json());


app.post("/api/auth/register", function (request, response) {

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
            error: "Utilizador já existe"
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
        message: "Utilizador registado com sucesso",
        user: {
            id: result.lastInsertRowid,
            username: username,
            email: email
        }
    });

});


app.post("/api/auth/login", function (request, response) {

    const email = request.body.email;
    const password = request.body.password;


    if (!email || !password) {

        return response.status(400).json({
            error: "Email e password são obrigatórios"
        });
    }


    const user = db.prepare(
        "SELECT * FROM users WHERE email = ?"
    ).get(email);


    if (!user) {

        return response.status(401).json({
            error: "Credenciais inválidas"
        });
    }


    const validPassword = bcrypt.compareSync(
        password,
        user.password
    );


    if (!validPassword) {

        return response.status(401).json({
            error: "Credenciais inválidas"
        });
    }


    response.status(200).json({
        message: "Login realizado com sucesso",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });

});


app.listen(PORT, function () {

    console.log(
        "Servidor de autenticação na porta " + PORT
    );

});