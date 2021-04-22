import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if(token){
        const validToken: any = await jwt.verify(token, process.env.TOKEN_SECRET as string);
        if(!validToken) next(); 
        req.user = validToken.userId;
    }
    next();
}