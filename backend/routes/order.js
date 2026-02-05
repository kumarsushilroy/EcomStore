

const express = require('express');
const router = express.Router();
const authenticatedUser  = require('../middleware.js')

const {createOrder, getOrders, updateOrderStatus} = require('../controllers/order.js')


router.post('/place-order' ,authenticatedUser, createOrder);
router.get('/all-orders', authenticatedUser, getOrders);
router.put('/update-orderStatus/:id', authenticatedUser, updateOrderStatus);


module.exports = router;