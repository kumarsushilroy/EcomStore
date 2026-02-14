
const express = require('express');
const router = express.Router();
const {register, login, upload, getUser, logout, findSingleUser, updateUser, deleteUser} = require('../controllers/auth.js');
const authenticatedUser = require('../middleware.js');

router.post('/register', upload.single('photo'), register);
router.post('/login', login);

router.post('/logout', logout)

router.get('/all-users', getUser);
router.get('/single-user', authenticatedUser, findSingleUser);
router.put('/update-user/:id', upload.single('photo'), updateUser);
router.delete('/delete-user/:id', deleteUser);

router.get('/test', authenticatedUser, async(req,res)=>{
   return res.json({
        message:'testing api !'
    })
})



module.exports = router;
