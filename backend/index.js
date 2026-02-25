
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieparser = require('cookie-parser')
const db = require('./db.js');
const cors = require('cors');

const authRouter = require('./routes/auth.js');
const productRouter = require('./routes/product.js');
const orderRoute = require('./routes/order.js');
const addressRoute = require('./routes/address.js');

const PORT = process.env.PORT || 4000
app.use(express.json());
app.use(cookieparser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use('/api/v1', authRouter); 
app.use('/api/v1', productRouter);
app.use('/api/v1', orderRoute);
app.use('/api/v1', addressRoute);




// app.get('/get', (req,res)=>{
//     res.json({message:'server is okay'})
// })

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
    db()
})