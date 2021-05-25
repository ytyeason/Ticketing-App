import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    // This `String` is the js class not ts
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// This is a middleware function implemented in mongoose
// we need to use convention function here, no arrow function(this will be overwritten as the context of this file, not user document)
userSchema.pre("save", async function(done){
  // `this` will be referring to the document we're saving.

  // we only want to hash password this if password is modified
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Add a custom static method to the userSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// User model
// specify the model to UserModel & UserDoc so that we can use build with User in typescript
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };