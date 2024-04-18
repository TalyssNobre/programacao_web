const express = require('express');
const app = express();
app.use(express.json());

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    estoque.push({ id: parseInt(id), nome, quantidade: parseInt(qtd) });
    res.send('Produto adicionado ao estoque com sucesso!');
});


app.get('/listar', (req, res) => {
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    estoque = estoque.filter(produto => produto.id !== parseInt(id));
    res.send('O produto foi removido do estoque com sucesso!');
});


app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const produto = estoque.find(produto => produto.id === parseInt(id));
    if (produto) {
        produto.quantidade = parseInt(qtd);
        res.send('A quantidade do produto foi atualizada com sucesso!');
    } else {
        res.status(404).send('Produto não foi encontrado no estoque.');
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


// http://localhost:8080/adicionar/1/produto1/10
// http://localhost:8080/listar
// http://localhost:3000/remover/1
// http://localhost:3000/editar/1/20