import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import db from './repository/base.repository';
import ridesRouter from './rides.router';
import swaggerDocument from '../docs/swagger.json';
import { requestLogger } from './middleware';



const app = express();
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/health', (req: any, res): any => res.send('Healthy'));
app.use('/rides', ridesRouter);

// docs
app.use(
  "/docs",
  swaggerUi .serve,
  swaggerUi.setup(swaggerDocument)
);

//  Script to setup sqlite DB in memory //
db.setupDb()
db.generateDummyRides(100);

export default app;
