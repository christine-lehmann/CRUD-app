const express = require("express");
const mongoose = require("mongoose");
// import model
const Item = require('./models/items');
const app = express();

// added middleware for post request
app.use(express.urlencoded({ extended:true }));
const mongodb = 'mongodb+srv://admin:admin@cluster0.1blzevm.mongodb.net/itemDB?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, 
useUnifiedTopology: true}).then(() => {
    console.log('Connected')
    app.listen(3000);
}).catch(err => console.log(err))

app.set('view engine','ejs');

// tesing route
// create items once refresh
// app.get('/create-item',(req, res) => {
//     const item = new Item({
//         name: 'computer',
//         price: 35000
//     });
//     item.save().then(result=>res.send(result)).catch(err =>
//         console.log(err))
// })
// // get item by id
// app.get('/get-item',(req, res) => {

//     Item.findById('65051d594ab5a4e60e307308').then(result=>res.send(result)).catch(err =>
//         console.log(err))

// })
app.get('/', (req, res) => {
    res.redirect('/get-items');
})
// render data
// get all items 
app.get('/get-items',(req, res) => {

    Item.find().then(result=> {

        res.render('index', { items: result });
    }).catch(err => console.log(err))
})
app.get('/add-item', (req, res)=> {
    res.render('add-item');
})
// post request (add items)
app.post('/items',(req, res)=> {
    console.log(req.body)
    const item = Item(req.body);
    item.save().then(()=> {
        res.redirect('/get-items')
    }).catch(err => console.log(err))
})
// Route parameter
// get items by id
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log('result',result);
        res.render('item-detail', {item: result})
    })
})
// add delete request
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/get-items' })
    })
})
// edit request
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'Updated Successfully' })
    })
})

app.use((req, res)=> {
    res.render('error');
})