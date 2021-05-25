import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// convert the callback based implementation to promise based implementation
const scrytAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string){
    const salt = randomBytes(8).toString('hex');
    // Hash the password along with the salt
    const buf = (await scrytAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string){
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scrytAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}