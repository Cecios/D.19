const jwt = require('jsonwebtoken');

const verifyToken = (request, response, next) => {
    const token = request.header['authorization'];

    if(!token){
        return response
        .status(401)
        .send({
            statusCode: 401,
            message: 'Your token is not valid'
        })
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        request.user = verified

        next()
    }catch(e){
        response
            .status(403)
            .send({
                statusCode:403,
                message:'Your token is not valid or expired!'
            })
    }
}
module.exports = verifyToken;