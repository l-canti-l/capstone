import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js';

dotenv.config();
connectDB();

// initialize express
const app = express();

//create route, is api running
app.get('/', (request, response) => {
    response.send('API is running......')
});

//mount product routes
app.use('/api/products', productsRoutes)

//use ENV declared port or use port 5000
const PORT = process.env.PORT || 5000

//listen on a port
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`));