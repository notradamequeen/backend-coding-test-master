import Logger from './src/lib/logger';
import app from './src/app';

require('dotenv').config();

const port = process.env.PORT;
app.listen(port, () => { 
    Logger.info(`App started and listening on port ${port}`)
});
