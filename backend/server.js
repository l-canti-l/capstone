import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, handler } from './middleware/errorMiddleware.js'

dotenv.config();
connectDB();

// initialize express
const app = express();

//body parser
app.use(express.json());

//create route, is api running
app.get('/', (request, response) => {
    response.send('API is running......')
});

//mount routes
app.use('/api/products', productsRoutes)
app.use('/api/users', userRoutes)

//middleware
app.use(notFound)
app.use(handler)

//use ENV declared port or use port 5000
const PORT = process.env.PORT || 5000

//listen on a port
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`));