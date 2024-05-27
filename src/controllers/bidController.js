const Bid = require('../models/Bid');
const Item = require('../models/Item');
const { validationResult } = require('express-validator');

exports.placeBid = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { itemId } = req.params;
    const { bidAmount } = req.body;

    try {
        const item = await Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (bidAmount <= item.currentPrice) {
            return res.status(400).json({ message: 'Bid amount must be higher than current price' });
        }

        const bid = await Bid.create({ itemId, userId: req.userId, bidAmount });

        item.currentPrice = bidAmount;
        await item.save();

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBidsByItemId = async (req, res) => {
    const { itemId } = req.params;

    try {
        const bids = await Bid.findAll({ where: { itemId } });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
