const Item = require('../models/Item');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

exports.createItem = [
    upload.single('image'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, startingPrice, endTime } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const item = await Item.create({ name, description, startingPrice, currentPrice: startingPrice, endTime, imageUrl });
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
];

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, startingPrice, endTime } = req.body;

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.startingPrice = startingPrice || item.startingPrice;
        item.endTime = endTime || item.endTime;

        await item.save();

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.destroy();

        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
