const { Schema, model, Types } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new Schema ({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [ isEmail, 'Please enter a valid email' ]
        // or 
        // validate: {
        //     validator: function(v) {
        //       return /\d{3}-\d{3}-\d{4}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        //   },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ]
    //firends: help here!!
},
{
    toJSON: {
      virtuals: true,
    },
  });

  // Get total count of replies on retrieval (using Virtuals)
// UserSchema.virtual("friendCount").get(function () {
//     return this.friends.length;
//   });

//create User Model using UserSchema
const User = model('User', UserSchema);

//export User model
module.exports = User;