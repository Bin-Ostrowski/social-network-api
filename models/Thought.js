// const { Schema, model, Types } = require("mongoose");

// const ReactionSchema = new Schema(
//     {
//      //set custom id to avoid confusion with parent thought _id
//     reactionId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId(),
//       },
//       reactionBody: {
//         type: String,
//         required: true,
//         max:[280, 'Your reaction is too long'],
//       },
//       username: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         //getters to transform data using utils function dateFormat
//       // get: (createdAtVal) => dateFormat(createdAtVal),
//       }
//     }
// )

// const ThoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       min: [1, "please enter a thought"],
//       max: [280, "Your thought is too long"],
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       //use getter!
//       // get: (createdAtVal) => dateFormat(createdAtVal),
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     //like replies
//     reactions: [ReactionSchema],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//       getters: true,
//     },
//   }
// );

// // Get total count of replies on retrieval (using Virtuals)
// // ThoughtSchema.virtual("reactionCount").get(function () {
// //     return this.reactions.length;
// //   });

// //create Thought model using ThoughtSchema
// const Thought = model("Thought", ThoughtSchema);

// //export Thought model
// module.exports = Thought;
