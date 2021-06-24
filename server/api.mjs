// require('dotenv').config();
import express from 'express'
import morgan from 'morgan'
import log from '@ajar/marker'
import cors from 'cors'

import {connect_db} from './db/mongoose.connection.mjs';
import user_router from './modules/user/user.router.mjs';

import {error_handler,error_handler2,not_found} from './middleware/errors.handler.mjs';   

const PORT = 3333;
const HOST = '0.0.0.0';
// git add 
// const { 
//   QOVERY_DATABASE_MY_MONGO_DB_USERNAME : DB_USERNAME,
//   QOVERY_DATABASE_MY_MONGO_DB_PASSWORD : DB_PASSWORD,
//   QOVERY_DATABASE_MY_MONGO_DB_HOST : DB_HOST,
//   QOVERY_DATABASE_MY_MONGO_DB_PORT : DB_PORT
// } = process.env;
let { QOVERY_DATABASE_MY_MONGO_DB_CONNECTION_URI : DB_URI = `mongodb://localhost:27017/crud-demo` } = process.env;
log.v('DB_URI: ' + DB_URI);


const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'))

// routing
// app.use('/api/stories', story_router);
app.use('/api/users', user_router);

// central error handling
app.use(error_handler);
app.use(error_handler2);

//when no routes were matched...
app.use('*', not_found)

//start the express api server
;(async ()=> {
  //connect to mongo db
  await connect_db(DB_URI);  
  await app.listen(PORT,HOST);
  log.magenta(`api is live on`,` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);  
})().catch(console.log)