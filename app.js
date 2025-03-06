require('dotenv').config();
const createError = require('http-errors');
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const produkRoutes = require('./routes/produkRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const stockRoutes = require('./routes/stockRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const logRoutes = require('./routes/logRoutes');
const alertRoutes = require('./routes/alertRoutes');
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use('/api/Users', userRoutes);
app.use('/api/Products', produkRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/transactions',transactionRoutes);
app.use('/api/stock',stockRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/orderDetail',orderDetailRoutes);
app.use('/api/log',logRoutes);
app.use('/api/alert',alertRoutes);

app.use(function(req, res, next) {
    next(createError(404));
});

const PORT = 7000;
app.listen(PORT,() => console.log('server running'));

