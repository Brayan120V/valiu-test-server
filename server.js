import * as web from 'express-decorators';
import express from 'express';
import bodyParser from 'body-parser';
import requireAll from 'require-all';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import history from 'connect-history-api-fallback';

require('./config/config');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000,
}));

app.use(cors());
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

const modules = requireAll(`${__dirname}/controllers`);
Object.keys(modules)
  .map(k => modules[k])
  .map((_val) => {
    const n = new _val();
    if (n.custom) {
      return app.use(n.router);
    }
    return web.register(app, n);
  });

mongoose.connect(process.env.URL_DB, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(db => console.log('Connect to DB'))
  .catch(err => console.log(err));

const server = app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

module.exports.io = require('socket.io')(server);
require('./services/socket');

module.exports = app;
