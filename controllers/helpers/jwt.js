const jwt = require('jsonwebtoken');

const generate_jwt = (id,name) => {
    return new Promise((resolve, reject)=>{
        const payload = {id,name};
        jwt.sign(
                payload,
                process.env.SECRET_JWT_SEDD,
                {
                    expiresIn : '1h'
                },
                (err,token)=>{
                    if(err){
                        console.log(err)
                        reject('no se pudo generar el token');
                    }
                    resolve(token);
                }
            )
    })
}

module.exports = {
    generate_jwt
}