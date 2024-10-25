const axios = require('axios'); // Make sure axios is installed
// env 
require('dotenv').config();
const processPayment = async (paymentDetails) => {
    const {email}= paymentDetails;

   // generate otp by otp service 
   try{
    // url in env name OTP_URL but adding ending part of url "generate"
    const url = `${process.env.OTP_URL}/api/otp/generate`;
    console.log('url:',url);
    await axios.post(`${process.env.OTP_URL}/api/otp/generate`,{email});
    return {success: true};
   }
    catch(error){
        //console.error('Error generating otp:', error);
        return {success: false};
    }
};

module.exports = { processPayment };
