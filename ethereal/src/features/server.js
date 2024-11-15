const express = require('express');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const app = express();
const port = 3000;

app.use(express.json());


app.post('/saveText', (req, res) => {
    const { texto } = req.body;
    myCache.set('textoTemporario', texto, 3600); 
    console.log('Texto salvo no cache');
    res.status(200).send('Texto salvo');
});


app.get('/readText', (req, res) => {
    const texto = myCache.get('textoTemporario');
    if (texto) {
        res.status(200).json({ texto });
    } else {
        res.status(404).send('Nenhum texto encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
