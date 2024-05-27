const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/uploads', express.static('uploads'));

app.use('/api/users', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', bidRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(errorHandler);

module.exports = app;
