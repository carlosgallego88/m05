const Database = require("better-sqlite3");

const db = new Database("./database/users.sqlite");


db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);


console.log("Base de dados de utilizadores ligada.");

module.exports = db;