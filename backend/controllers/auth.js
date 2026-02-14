const bcrypt = require('bcrypt');
const userSchema = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('../helper/helper.js');
const { options } = require('../routes/auth.js');

// img Config...
 const imgConfig = multer.diskStorage({
        destination:(req,file,callback)=>{
            callback(null, 'uploads/')
        },
        filename:(req,file,callback)=>{
            callback(null, `image-${Date.now()}-${file.originalname}`)
        }
    });

    const isImage = (req,file,callback)=>{
        if(file.mimetype.startsWith('image')){
            callback(null, true)
        }else{
            callback(new Error('only image should be uploaded'))
        }
    }

    const upload = multer({
        storage:imgConfig,
        fileFilter:isImage
    })  

const register = async (req,res)=>{
  console.log('filePath-- ', req.file)
    try {
        const cloudImg = await cloudinary.uploader.upload(req.file.path);
        console.log('CLOUDINARY== ', cloudImg);

        const {username, email, password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                message:'all fields require !'
            })
        }
        const userExist = await userSchema.findOne({email});
        if(userExist){
            return res.status(400).json({
                message:'user already exist with this credentials'
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const user = new userSchema({
            username,
            email,
            password:hashPass,
            photo:cloudImg.secure_url
            });
        await user.save();
        return res.status(200).json({ 
            success:true,
            message:'Registered Successfully',
            user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

const login = async (req,res)=>{
    try{
     const {email,password} = req.body;
     if(!email || !password){
        return res.status(400).json({
            message:'all fields require !'
        })
     }
     const user = await userSchema.findOne({email});
     if(!user){
        return res.status(400).json({
            message:'user not found !'
        })
     }
     const matchPassword = await bcrypt.compare(password, user.password);
     if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:'password does not match !'
        })
     }
     const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'30d'});
     res.cookie('authtoken', token, {
        httpOnly:true,
        maxAge:30*24*60*60*1000,
        secure:false
     })
     return res.status(200).json({
        success:true,
        message:'logged in successfully',
        user:user
     })
    }catch(err){
      return res.status(400).json({
        success:false,
        message:'something went wrong !',
        error:err.message
      })
    }
}

const logout = async (req,res)=>{
    try{
      res.clearCookie('authtoken', {httpOnly:true, secure:false}).json({
        success:true,
        message:'Logged out successfully !'
      })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:err.message
        })
    }
}

const getUser = async(req,res)=>{

   const {search} = req.query;
   const query = {}

   if(search){
    //   query.username = {$regex:search, $options:'i'}
    query.$or = [
        {username:{$regex:search, $options:'i'}},
        {email:{$regex:search, $options:'i'}}
    ]
   }
   console.log('Query==', query)
    try{
     const allUsers = await userSchema.find(query);
     return res.status(200).json({
        success:true,
        users:allUsers
     })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:err.message
        })
    }
}

const findSingleUser = async (req,res)=>{
    try{
        const id = req.user.id
        console.log('iddd', id)
     const singleUser = await userSchema.findById(id)
     return res.status(200).json({
        success:true,
        user:singleUser
     })
    }catch(err){
       return res.status(400).json({
        success:false,
        message:'something went wrong !',
        error:err.message
       })
    }
}

const updateUser = async (req,res)=>{
    
    try{
      const id = req.params.id;
      const updatedData = {
        username:req.body.username,
        email:req.body.email
        // password:req.body.password && await bcrypt.hash(req.body.password,10),
      }
      if(req.file){
        const uploaded = await cloudinary.uploader.upload(req.file.path);
        updatedData.photo = uploaded.secure_url
      }
      const update = await userSchema.findByIdAndUpdate({_id:id}, updatedData, {new:true});
      console.log('upDated==', updatedData)
      return res.status(200).json({
        success:true,
        message:'user updated successfully',
        updated:update
      })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:err.message
        })
    }
}

const deleteUser = async (req,res)=>{
    try {
        const id = req.params.id
        const deleteuserInfo = await userSchema.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:'user deleted successfully !',
            deleteuserInfo
        });
    } catch (error) {
         return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:err.message
        })
    }
}

module.exports = {register, login,  getUser, logout, findSingleUser, updateUser, upload, deleteUser};