const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      unique:true,
      required: true, 
      trim: true
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ isEmail, 'invalid Email']
    },    
// thoughts
// Array of _id values referencing the Thought model

// friends
// Array of _id values referencing the User model (self-reference)

// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;