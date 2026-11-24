const http = require("http");

const PORT = 3001;

const server = http.createServer(function (request, response) {

    const method = request.method;
    const url = request.url;

    response.setHeader("Content-Type", "application/json");


    if (method === "GET" && url === "/") {

        response.writeHead(200);

        response.end(
            JSON.stringify({
                message: "Servidor Node funcionando"
            })
        );

    }
    else if (method === "GET" && url === "/api/books") {

        response.writeHead(200);

        response.end(
            JSON.stringify([
                {
                    id: 1,
                    title: "Node Basics"
                },
                {
                    id: 2,
                    title: "Learning HTTP"
                }
            ])
        );

    }
    else if (method === "POST" && url === "/api/books") {

        response.writeHead(201);

        response.end(
            JSON.stringify({
                message: "Livro criado com sucesso"
            })
        );

    }
    else if (method === "DELETE" && url === "/api/books/1") {

        response.writeHead(200);

        response.end(
            JSON.stringify({
                message: "Livro eliminado com sucesso"
            })
        );

    }
    else {

        response.writeHead(404);

        response.end(
            JSON.stringify({
                error: "Rota não encontrada"
            })
        );
    }

});


server.listen(PORT, function () {

    console.log(
        "Servidor a executar na porta " + PORT
    );

});