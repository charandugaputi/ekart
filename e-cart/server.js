const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/e-cart', { useNewUrlParser: true, useUnifiedTopology: true });

// Define models
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    stock: Number
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    email: String
}));

// Define routes
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

app.post('/api/users/register', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.post('/api/users/login', async (req, res) => {
    const user = await User.findOne(req.body);
    if (user) {
        res.json(user);
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
