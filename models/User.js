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
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      // friends
// Array of _id values referencing the User model (self-reference)
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]

},
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  });
// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
  
  // get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  // create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;