const jwt = require("jsonwebtoken")
async function identifyUser(req,res,next){
     const token = req.cookies.jwt_token;

     if (!token) {
       return res.status(401).json({
         message: "unauthorized access",
       });
     }

     let decode;
     try {
       decode = await jwt.verify(token, process.env.JWT_SECRETS);
     } catch (error) {
       return res.status(401).json({
         message: "unauthorized access",
       });
     }

     req.user = decode
    

     next()

}

module.exports = identifyUser