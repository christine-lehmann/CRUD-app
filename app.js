const express = require("express");
const app = express();

app.set('view engine','ejs');
app.listen(3000);

app.get('/', (req, res) => {
    const items = [
        { name: 'smart phone', price: 15000},
        { name: 'book', price: 150},
        { name: 'computer', price: 35000},    
    ]
    res.render('index', { items });
})
app.get('/add-item', (req, res)=> {
    res.render('add-item');
})
app.use((req, res)=> {
    res.render('error');
})