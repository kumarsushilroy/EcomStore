const {emailTemplate} = require('./emailTemp.js')
const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     secure:true,
//     host:'smtp.gmail.com',
//     port:465,

//     auth:{
//         user:'sushilkumar4041998@gmail.com',

//     }
// })


// Looking to send emails in production? Check out our Email API/SMTP product!


const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ec6745de5aadff",
    pass: "caa775bfaf83d8"
  }
});

const sendEmailMsg = (username)=>{
   
   const emailMessage = transport.sendMail({
    from:"sushilkumar 'sushilkumar4041998@gmail.com'",
    to:'romanreins488@gmail.com',
    subject:'wealthcare job',
    text: `Welcome ${username} thank you for registering in Ecom`
    
  
});
console.log('messageInfo==', emailMessage)
}


module.exports = {sendEmailMsg}


