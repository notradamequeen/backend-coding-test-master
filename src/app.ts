import express from 'express';
import bodyParser from 'body-parser';
import db from './repository/base.repository';
import ridesRouter from './rides.router';

const app = express();
app.use(bodyParser.json());
app.get('/health', (req: any, res): any => res.send('Healthy'));
app.use('/rides', ridesRouter);

//  Script to setup sqlite DB in memory //
db.setupDb()

export default app;
