import Logger from './lib/logger';
import { Request, Response, NextFunction } from 'express';


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`HTTP ${req.method} ${req.path} - from ip: ${req.ip}`);
    next();
}