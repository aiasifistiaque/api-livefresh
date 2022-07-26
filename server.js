import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';

//importing routes starts from here
import authRoute from './routes/authRoute.js';
import addressRoute from './routes/addressRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import voucherRoute from './routes/voucherRoute.js';

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();
connectDb();

//api endpoints
app.use('/api/auth', authRoute);
app.use('/api/address', addressRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/orders', orderRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/vouchers', voucherRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port: ${port}`));
