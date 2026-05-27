// antes de iniciar a criação do servidor com Node.js e Exprees, precisamos inicializar o npm: npm init -y
// Ápos isso, podemos instalar o Express: npm install express (no terminal)

// EXPRESS -> Framework para Node.js que facilita a criação de servidores e APIs.

// Importa a biblioteca Express dentro do projeto
const express = require('express');

// Cria uma aplicação Express (assim teremos acesso aos recursos do framework)
const app = express(); 

const PORT = 3000; // Porta onde o servidor irá rodar

// Middleware próprio do Express que permite a aplicação entender dados no formato JSON (principalmente nas requisições do tipo POST e PUT)
app.use(express.json()); 

// Criando um Endpoint (ponto de acesso ao servidor/API)
// app -> aplicação Express
// .get -> método HTTP 
// '/' -> rota (caminho) 
// (req, res) -> função com parametros de requisição (req) e resposta (res)
// res.send -> resposta
app.get('/', (req, res) => {
    // Envia a resposta simples para o navegador
    res.send('Servidor Express funcionando!'); 
});

// método get + rota de usuários para listar usuários cadastrados
app.get("/produtos", (req, res) => {
    res.json([
        { id: 1, nome: "Produto A", preco: 10.99 },
        { id: 2, nome: "Produto B", preco: 19.99 }
    ]);
});

// parametros de rota (acessar um item específico)
app.get("/produtos/:id", (req, res) => {
    // req.params captura os parâmetros enviados pela URL
    // neste caso, queremos o parâmetro: ID 
    const id = req.params.id; 

    // Resposta
    res.json({
        mensagem: `Produto encontrado`,
        id: id
    });

});

// método get + rota de usuários para listar usuários cadastrados
app.get("/usuarios", (req, res) => {
    res.json([
        { id: 1, nome: "João"},
        { id: 2, nome: "Maria"}
    ]);
});

// Método POST + rota de produtos
app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    res.json({
        mensagem: "Produto cadastrado com sucesso!",
        produto: novoProduto
    });
});

// Método PUT + rota de produtos
app.put("/produtos", (req, res) => {
    const  dadosAtualizados = req.body;
    res.json({
        mensagem: "Produto atualizado com sucesso!",
        dados: dadosAtualizados
    });
});

// Método DELETE + rota de produtos
app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        mensagem: `Produto removido com sucesso!`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
