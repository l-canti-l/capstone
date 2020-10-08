const express = require('express');
const products = require('./data/products');

// initialize express
const app = express();

//create route, is api running
app.get('/', (request, response) => {
    response.send('API is running......')
});

//create API route for products
app.get('/api/products', (request, response) => {
    response.json(products)
});

//create single product by id route
app.get('/api/products/:id', (request, response) => {
    const product = products.find(prod => prod._id === request.params.id)
    response.json(product)
});


//listen on a port
app.listen(5000, console.log('Server running on port 5000'));