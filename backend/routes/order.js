

const express = require('express');
const router = express.Router();
const authenticatedUser  = require('../middleware.js')

const {createOrder, getOrders, updateOrderStatus, userOrders, allOrders} = require('../controllers/order.js')


router.post('/place-order' ,authenticatedUser, createOrder);
router.get('/user-orders', authenticatedUser, userOrders);
router.put('/update-orderStatus/:id', authenticatedUser, updateOrderStatus);
router.get('/all-orders', allOrders)


module.exports = router;