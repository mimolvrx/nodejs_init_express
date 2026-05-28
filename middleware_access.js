// midleware de acesso
// ele será usado para realizar uma autentificação

// Importando a biblioteca do Express
const express = require('express');
// Criando a aplicação
const app = express();
// Definição da porta
const PORT = 3000;
// middleware nativo para interpretar JSON
app.use(express.json()); 

function verificarAcesso(req, res, next) {
    const autorizado = false; // simulção de acesso
    // true -> acesso liberado
    // false -> acesso negado
    if(autorizado) {
        // estando autorizado pode prosseguir 
        next(); 
    } else {
        res.status(403).json({ 
            // se não estiver autorizado, o acesso estará negado
            message: "Acesso negado" 
        });
    }
}

// Incluindo o middleware para a requisição do tipo GET, para a rota "/admin"
app.get("/admin", verificarAcesso, (req, res) => {
    res.json({ 
        message: "Área administrativa acessada!" 
    });
});

// Definição da porta
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});