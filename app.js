const express = require("express");
const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.send('<p>Hello World</p>')
})
app.get('/add-item', (req, res)=> {
    res.send('<h1>Add items</h1>')
})