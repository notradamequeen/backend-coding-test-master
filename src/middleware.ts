import Logger from './lib/logger';
import { Request, Response, NextFunction } from 'express';


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`HTTP ${req.method} ${req.path} - from ip: ${req.ip}`);
    next();
}


export const authenticationHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['x-api-key']) {
        res.status(401).json('Unauthorized!');
    } else if (req.headers['x-api-key'] !== process.env.API_KEY) {
        res.status(401).json('Invalid token!');
    } else {
        next()
    }

}