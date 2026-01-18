import jwt from 'jsonwebtoken';

export function authenticateToken(req,res,next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Token is required"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err){
            return res.status(403).json({
                message: "Invalid or expired Token"
            })
        }
        req.user = user;
        next();
    })
}