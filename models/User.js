const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
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
      validate: [isEmail, "Please enter a valid email"],
    },
    //	Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual called friendCount that retrieves the length
// of the user's friends array field on query.
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//create User Model using UserSchema
const User = model("User", UserSchema);

//export User model
module.exports = User;
