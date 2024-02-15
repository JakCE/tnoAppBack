import jwt from 'jsonwebtoken';

export function VerifyToken(req, res, next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');
  
    const token = req.headers.authorization.substr(7);
    if(token!=''){
        const content = jwt.verify(token,'tno');
        req.data = content;
        next();
    }
}