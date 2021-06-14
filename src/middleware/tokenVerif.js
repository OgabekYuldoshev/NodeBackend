const jwt = require('jsonwebtoken')

module.exports = async(req, res, next)=>{
    if(req.headers.authorization === undefined) {res.status(401).send("Unauthorization")}
    const token  = req.headers.authorization.split("Bearer ")
    if(!token) res.status(401).send("Unauthorization")
    await jwt.verify(token[1],  process.env.MYTOKENSECRET, function(err, decoded) {
        if(err) res.status(401).send("Unauthorization")
        next()
    });
    
}