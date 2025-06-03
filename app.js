const express = require('express');
const app = express();
const cors = require('cors');
const createError = require('http-errors');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const apiTestRouter = require('../app/api-test/router');
const confirmationRouter = require('../app/confirmation/router');
const greetingsRouter = require('../app/greetings/router');
const URL = '/api/v1';

app.use(`${URL}`, apiTestRouter);
app.use(`${URL}/confirmation`, confirmationRouter);
app.use(`${URL}/greetings`, greetingsRouter);

// 404 handler
app.use(function (_, __, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, _) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

// Export as serverless function for Vercel
const serverless = require('serverless-http');
module.exports = serverless(app);
