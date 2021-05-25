import express, {Request, Response, NextFunction} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({
    min: 4,
    max: 20
  }).withMessage('Password must be between 4 and 20 chars')
], (req: Request, res: Response, next: NextFunction) => {
  // Pull the validation result from the body validator above
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // This will be automatically picked up by error-handler middleware
    throw new RequestValidationError(errors.array());
  }

  const { email, body } = req.body;

  console.log('Creating ... ');
  throw new DatabaseConnectionError();

  res.send({});

});

export { router as signUpRouter };