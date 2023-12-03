import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface ExtendedRequest extends Request {
    user?: JwtPayload;
}
const jwtSecret = process.env.JWT_SECRET || 'secret_fallback';

export function authenticateToken(req: ExtendedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) return res.sendStatus(403);

        // Tu peux définir un type pour 'decodedToken' pour avoir une meilleure assurance du type
        req.user = decodedToken as JwtPayload;
        next();
    });
}
