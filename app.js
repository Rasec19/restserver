require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

app.listen(port, () => {
    console.log(`Aplicacion en http://localhost:${port}`)
})