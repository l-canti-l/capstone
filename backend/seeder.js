import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //insert users into array calledd createdUsers
        const createdUsers = await User.insertMany(users);
        //get the admin user from createdUsers array
        const adminUser = createdUsers[0]._id;
        //map thru products and add admin user to each product
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        //insert products with addmin user
        await Product.insertMany(sampleProducts)

        console.log('Imported data')
        process.exit()
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Removed data')
        process.exit()
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}
//set call
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}