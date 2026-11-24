const fs = require("fs");

const file = "data.json";

const command = process.argv[2];


function readData() {

    const data = fs.readFileSync(file, "utf8");

    const jsonData = JSON.parse(data);

    console.log(jsonData);
}


function writeData() {

    const data = [
        {
            id: 1,
            name: "Carlos",
            course: "Programacao Web"
        },
        {
            id: 2,
            name: "Joao",
            course: "Node.js"
        }
    ];

    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 4)
    );

    console.log("Ficheiro escrito com sucesso.");
}


function updateData() {

    const data = fs.readFileSync(file, "utf8");

    const jsonData = JSON.parse(data);

    jsonData.push({
        id: jsonData.length + 1,
        name: "Maria",
        course: "Express"
    });

    fs.writeFileSync(
        file,
        JSON.stringify(jsonData, null, 4)
    );

    console.log("Ficheiro atualizado com sucesso.");
}


function deleteFile() {

    if (fs.existsSync(file)) {

        fs.unlinkSync(file);

        console.log("Ficheiro eliminado com sucesso.");
    }
    else {

        console.log("O ficheiro não existe.");
    }
}


if (command === "read") {

    readData();
}
else if (command === "write") {

    writeData();
}
else if (command === "update") {

    updateData();
}
else if (command === "delete") {

    deleteFile();
}
else {

    console.log("Comandos disponíveis:");
    console.log("read");
    console.log("write");
    console.log("update");
    console.log("delete");
}