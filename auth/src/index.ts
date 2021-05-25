import express from 'express';
// Augment the default async error behavior for us.
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// `all` works for any kind of request method
app.all('*', async () => {
  // Express will catch this error 
  // and pass it to the errorHandler middleware
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    // domain name should be the name of the mongodb cluster ip service.
    // auth will be the name of the database that mongodb will create for us.
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
