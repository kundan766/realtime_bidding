const Item = require('./models/Item');
const Bid = require('./models/Bid');
const NotificationService = require('./services/notificationService');

const bidSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('bid', async ({ itemId, userId, bidAmount }) => {
            try {
                const item = await Item.findByPk(itemId);

                if (!item) {
                    return socket.emit('error', { message: 'Item not found' });
                }

                if (bidAmount <= item.currentPrice) {
                    return socket.emit('error', { message: 'Bid amount must be higher than current price' });
                }

                const bid = await Bid.create({ itemId, userId, bidAmount });

                item.currentPrice = bidAmount;
                await item.save();

                await NotificationService.createNotification(item.userId, `You have been outbid on item ${item.name}`);
                io.emit('update', { itemId, bidAmount });

            } catch (error) {
                socket.emit('error', { message: 'Server error' });
            }
        });
    });
};

module.exports = {
    bidSocket,
};
