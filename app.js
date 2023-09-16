const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongodb = 'mongodb+srv://admin:admin@cluster0.1blzevm.mongodb.net/itemDB?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, 
useUnifiedTopology: true}).then(() => {
    console.log('Connected')
    app.listen(3000);
}).catch(err => console.log(err))

app.set('view engine','ejs');


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