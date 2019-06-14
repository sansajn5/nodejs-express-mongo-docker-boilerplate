const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressJwt = require('express-jwt');

const envPath = path.resolve(process.cwd(), 'src', '.env');
require('dotenv').config({
  path: envPath,
});

const { authRoutes, userRoutes, basketballRoutes } = require('./api');
const db = require('./database/index');

const app = express();
const port = 3000 || process.env.APP_PORT;

app.use(morgan('combined'));

app.use(bodyParser.json());

const jwtAuth = expressJwt({
  secret: process.env.JWT_SECRET,
}).unless({ path: ['/api/auth/register', '/api/auth/login'] });

app.use(jwtAuth);
app.use((err, req, res, next) => {
  if (err) res.json(err.message, err.status);
  else next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/basketball', basketballRoutes);

db.connect()
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MongoDB!'))
  // eslint-disable-next-line no-console
  .catch(err => console.error('Error while connecting to MongoDB.', err));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App started successfully! Try it at http://localhost:${port}`));
