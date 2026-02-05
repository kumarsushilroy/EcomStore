
const express = require('express');

const router = express.Router();
const {addAddress, getAllAddress} = require('../controllers/address.js')
const authenticatedUser = require('../middleware.js');

router.post('/add-address', authenticatedUser, addAddress);
router.get('/user-address', authenticatedUser, getAllAddress)

module.exports = router;