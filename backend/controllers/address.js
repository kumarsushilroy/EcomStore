const addressSchema = require('../models/address.js')

const addAddress = async (req,res)=>{
   
    try {
         const {state,city,destrict,pincode,landmark} = req.body;

         const userId = req.user._id ;

         if(!state || !city || !destrict || !pincode){
            return res.status(400).json({
                success:false,
                message:'please fill all mandatory field'
            })
         }
         let createdAddress = new addressSchema({state:state, city:city, destrict:destrict, pincode:pincode, landmark:landmark, userId:userId});
        await createdAddress.save();
        return res.status(200).json({
            success:true,
            message:'address created successfully !',
            createdAddress
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
            
        })
    }
}

const getAllAddress = async (req,res)=>{
    const loggedInUserId = req.user._id
    try {
        const allAddress = await addressSchema.find({userId:loggedInUserId});
        if(allAddress.length==0){
            return res.status(400).json({
                success:false,
                message:'no any address found with this id !'
            })
        }
        return res.status(200).json({
            success:true,
            allAddress
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

module.exports = {addAddress, getAllAddress}