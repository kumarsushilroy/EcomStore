
const mongoose = require('mongoose');

const connect = ()=>{
    mongoose.connect('mongodb+srv://romanreins488:chintu@user-management.ciqitgh.mongodb.net/?appName=User-Management').then(()=>{
        console.log('Connection Successfull')
    }).catch((err)=>{
        console.log('error in con nection: ', err.message)
    })
}

module.exports = connect; 