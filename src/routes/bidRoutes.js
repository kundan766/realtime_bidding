const express = require('express');
const { check } = require('express-validator');
const { placeBid, getBidsByItemId } = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post(
    '/:itemId/bids',
    authMiddleware,
    [check('bidAmount', 'Bid amount is required').not().isEmpty()],
    placeBid
);

router.get('/:itemId/bids', getBidsByItemId);

module.exports = router;
