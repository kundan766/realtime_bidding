const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { userId: req.userId } });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.markRead = async (req, res) => {
    const { id } = req.body;

    try {
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
