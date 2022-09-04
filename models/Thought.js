const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    //set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, "Your reaction is too long"],
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getters to transform data using utils function dateFormat
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "please enter a thought"],
      maxlength: [280, "Your thought is too long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getters to transform data using utils function dateFormat
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    //like replies
    // Array of nested documents created with the reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Get total count of reactions on retrieval (using Virtuals)
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create Thought model using ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

//export Thought model
module.exports = Thought;
