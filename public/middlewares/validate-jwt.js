const {response} = require('express')
const jwt = require('jsonwebtoken');

const validate_jwt = (req,res = response,next)=>{
    // x-token headers
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            status : false,
            msg : "no hay token"
        })
    }

    try {
        const payload = jwt.verify(
                                token,
                                process.env.SECRET_JWT_SEDD
                                )

    } catch (error) {
        return res.status(401).json({
            status : false,
            msg : "token invalido"
        })
    }

    console.log(token);
    next();
}

module.exports = {
    validate_jwt
}