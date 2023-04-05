import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config(); // environment variables set up
import mongoose from 'mongoose';

import Server from './classes/Server.js';
import app from './app.js';

// path to current file
const __filename = fileURLToPath(import.meta.url);

// path to current directory
const __dirname = path.dirname(__filename);

// connect to remote database server
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.db_connection_string, {
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Connected to remote database server`));

// create server class
const server = new Server(app);

// start listening for http requests
server.start();
