const app = require('./app');
require('dotenv').config();
const sequelize = require('./config/database');
const http = require('http');
const socketio = require('socket.io');
const { bidSocket } = require('./socket');


const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log('Database connected');
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Unable to connect to the database:', err));

bidSocket(io);
