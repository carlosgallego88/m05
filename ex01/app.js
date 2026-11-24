const args = process.argv.slice(2);

const command = args[0];
const name = args[1];

if (!command) {
    console.log("Debes introducir un comando.");
    console.log("Ejemplo: node app.js hello Carlos");
}
else if (command === "hello") {

    if (name) {
        console.log("Hola " + name + "!");
    }
    else {
        console.log("Debes introducir un nombre.");
    }

}
else if (command === "goodbye") {

    if (name) {
        console.log("Adiós " + name + "!");
    }
    else {
        console.log("Debes introducir un nombre.");
    }

}
else if (command === "help") {

    console.log("Comandos disponibles:");
    console.log("hello <nombre>");
    console.log("goodbye <nombre>");
    console.log("help");

}
else {

    console.log("Comando no reconocido.");
    console.log("Utiliza 'help' para ver los comandos disponibles.");

}