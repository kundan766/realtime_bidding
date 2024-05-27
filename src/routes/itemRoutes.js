const express = require('express');
const { check } = require('express-validator');
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post(
    '/',
    authMiddleware,
    roleMiddleware(['admin', 'user']),
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('startingPrice', 'Starting price is required').not().isEmpty(),
        check('endTime', 'End time is required').not().isEmpty(),
    ],
    createItem
);

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'user']), deleteItem);

module.exports = router;
