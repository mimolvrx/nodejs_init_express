// Importa a biblioteca do Express
const express = require('express');

// Cria a aplicação express
const app = express();

// Define a porta para o servidor
const PORT = 3000;

// Middleware nativo do express para interpretar JSON
app.use(express.json());

// Middleware de acesso
function logger(req, res, next) {
    // Exibe o método e a url acessada
    console.log(req.method, req.url);
    next(); // continua execução
};
app.use(logger); // aplica o middleware para todas as rotas

// Middleware de validação de senha
function validarSenha(req, res, next) {
    // const senha irá armazenar o valor da chave "senha", que será passado através da URL da requisição
    // LEMBRANDO: query parametters (/adimin?senha=...)
    const senha = req.query.senha;
    if (senha === "1234") {  
        // com a senha correta, podemos ir para o proximo passo
        next(); // continua execução
    } else {
        // Senão, o acesso será negado já com a verificação do middleware, retormando o acesso negado devido a senha incorreta
        res.status(403).json({
            message: "Acesso negado" 
        });
    }
};

app.use(validarSenha); // aplica o middleware para todas as rotas

// Array de produtos (produtos em memória)
let produtos = [
    { id: 1, nome: "Notebook", preco: 7000 },
    { id: 2, nome: "Mouse", preco: 150 }
];

app.get("/", (req, res) => {
    res.send("Servidor Express funcionando");
});

// Rota de exibição de produtos (método get + rota "/produtos")
app.get("/produtos", (req, res) => {
    res.json({
        Produtos: produtos
    });
});
// Busca de produtos através do ID (método get + rota "/produtos/:id")
app.get("/produtos/:id", (req, res) => {
    // a const ID irá armazenar o ID informado nos query parametters da URL da requisição como: /produtos/1 (sendo produto cujo id = 1)
    const id = req.params.id;
    // Assim que o produto for localizado, retorna mensagem e o produto
    res.json({
        mensagem: "Produto encontrado",
        // produtos = array de produtos
        // [] = com os colchetes, posso passar a posição do produto dentro do array
        // Caso ID do produto seja 1, a posição dele no array é 0 (zero)
        // Então precisamos passar como [id-1] 
        produto: produtos[id-1]
    });
});

// Cadastro de novo produto (método POST + rota "/produtos")
app.post("/produtos", (req, res) => {
    // A const novoProduto irá receber todo o conteúdo do corpo da requisição (body)
    const novoProduto = req.body;
    // .push é um método do JavaScript para incluir novas informaões dentro do meu array, no nosso contexto sendo o array de produtos, então: produtos.push(o produto novo)
    produtos.push(novoProduto);
    // Resposta do servidor ao realizar o cadastro, exibindo uma mensagem de confirmação e exibindo os dados do produto novo
    res.json({
        message: "Produto cadastrado com sucesso",
        produto: novoProduto
    });
});

// Atualização de produto existentes (método PUT + rota "/produtos")
app.put("/produtos", (req, res) => {
    const dadosAtualizados = req.body;
    produtos = produtos.map(produto => {
        if(produto.id === dadosAtualizados.id) {
            return {
                ...produto,
                preco: dadosAtualizados.preco
            };
        }
        return produto;
    });
    res.json({
        produto: produtos
    });
});