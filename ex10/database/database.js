const Database = require("better-sqlite3");

const db = new Database("./database/library.sqlite");


db.exec(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL
    )
`);


const count = db.prepare(
    "SELECT COUNT(*) AS total FROM books"
).get();


if (count.total === 0) {

    const insert = db.prepare(
        "INSERT INTO books (title, author) VALUES (?, ?)"
    );

    insert.run(
        "Node Basics",
        "Carlos"
    );

    insert.run(
        "Learning Express",
        "Joao"
    );
}


console.log("Base de dados SQLite ligada.");

module.exports = db;