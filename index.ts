import Logger from './src/lib/logger';
import app from './src/app';


const port = 8010;
app.listen(port, () => { 
    Logger.info(`App started and listening on port ${port}`)
});
