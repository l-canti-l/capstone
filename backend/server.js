import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';



dotenv.config();
connectDB();

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

//use ENV declared port or use port 5000
const PORT = process.env.PORT || 5000

//listen on a port
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`));