# Módulo 05 - Node.js e Express

Trabalho realizado por: *Carlos Gallego* **882 155**

Curso: Informática  
Data de submissão: 24/11/2026

## Exercícios realizados

- EX01 - First Node Program
- EX02 - File System
- EX03 - JSON Data Manager
- EX04 - HTTP Server
- EX05 - First Express API
- EX06 - Routes and Parameters
- EX07 - CRUD API
- EX08 - Middleware
- EX09 - Database
- EX10 - Node Base de Dados SQL
- EX11 - User Registration
- EX12 - Login

## EX01 - First Node Program

Neste exercício foi criado um programa simples em Node.js que utiliza argumentos da linha de comandos.

Foram criados vários comandos, como `hello`, `goodbye` e `help`, permitindo utilizar diferentes argumentos através do terminal.

## EX02 - File System

Neste exercício foi utilizado o módulo `fs` do Node.js para trabalhar com ficheiros.

Foram implementadas as operações de:

- leitura
- escrita
- atualização
- eliminação

Também foi utilizado um ficheiro JSON, utilizando `JSON.parse()` e `JSON.stringify()` para trabalhar com os dados.

## EX03 - JSON Data Manager

Neste exercício foi criado um gestor de livros utilizando um ficheiro JSON.

Foram implementados os comandos:

- add
- list
- search
- update
- remove

Os dados são lidos e guardados no ficheiro `books.json`.

## EX04 - HTTP Server

Neste exercício foi criado um servidor HTTP utilizando apenas Node.js, sem utilizar Express.

O servidor responde a diferentes URLs e métodos HTTP, incluindo GET, POST e DELETE.

Também foram utilizados códigos de estado HTTP e respostas em formato JSON.

## EX05 - First Express API

Neste exercício foi criado o primeiro servidor utilizando Express.

Foram utilizadas rotas GET, respostas JSON e diferentes códigos de estado HTTP.

Também foi criado o endpoint:

`GET /health`

para verificar o estado do servidor.

## EX06 - Routes and Parameters

Neste exercício foi criada uma API de livros utilizando rotas e parâmetros.

Foram implementadas as rotas:

- GET /api/books
- GET /api/books/:id

Também foram utilizados query parameters para filtrar livros através do autor.

## EX07 - CRUD API

Neste exercício foi implementado um CRUD completo para uma API de livros.

Foram utilizados os métodos:

- GET
- POST
- PUT
- PATCH
- DELETE

Também foram realizadas validações e utilizados códigos de estado para indicar erros e operações realizadas com sucesso.

## EX08 - Middleware

Neste exercício foram implementados diferentes middlewares em Express.

Foram criados middlewares para:

- logging
- autenticação simulada
- validação de dados

Também foi criado um middleware configurável que pode ser ativado ou desativado.

## EX09 - Database

Neste exercício foi criada uma base de dados SQLite para uma biblioteca.

Foram criadas as tabelas:

- books
- authors
- categories

A base de dados foi criada utilizando a biblioteca `better-sqlite3`.

## EX10 - Node Base de Dados SQL

Neste exercício foi ligada uma API Express a uma base de dados SQLite.

Foram realizadas operações SQL através de queries preparadas e parâmetros.

Foram implementadas operações para:

- consultar livros
- consultar um livro através do ID
- inserir livros
- atualizar livros
- eliminar livros

## EX11 - User Registration

Neste exercício foi implementado o registo de utilizadores.

Foram utilizados:

- username
- email
- password
- validação
- hashing da password

As passwords são guardadas utilizando hashing com `bcryptjs`.

Também foram realizadas validações para impedir usernames ou emails repetidos.

## EX12 - Login

Neste exercício foi implementado um sistema simples de autenticação.

Foram criadas as rotas:

- POST /api/auth/register
- POST /api/auth/login

No registo, a password é guardada através de hashing.

No login, `bcryptjs` é utilizado para comparar a password introduzida com o hash guardado na base de dados.

Também foram utilizadas mensagens de erro consistentes para credenciais inválidas.