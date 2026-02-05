const jwt = require('jsonwebtoken');
const userSchema = require('./models/auth.js');

const authenticatedUser = async (req,res,next)=>{
    try {
        const token = req.cookies.authtoken;
        // console.log('TOEKN==', token)
        if(!token){
            return res.status(400).json({
                message:'token not provided'
            })
        }
       const decode = jwt.verify(token, process.env.SECRET_KEY);
       const user = await userSchema.findById(decode.id);
       req.user = user;
       next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

module.exports = authenticatedUser