const { Thought, User } = require("../models");

const thoughtController = {
  //GET to get all thoughts - GET /api/thoughts
  getAllThought(req, res) {
    Thought.find({})
    //   .populate({
    //       path: "reactions",
    //       select: "-__v",
    //   })
    //   .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //GET to get a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // .populate({
      //     path: "reactions",
      //     select: "-__v",
      // })
    //   .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //POST to create a new thought (don't forget to push the created thought's
  // _id to the associated user's thoughts array field)
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id, params}) => {
        //is creating new thought but not populating to user's thought array
          console.log(params.userId)
        return User.findOneAndUpdate(
            { id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
            );
        })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this userName!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //PUT to update a thought by its _id
  updateThought({ params, body }, res) {
    console.log(body);
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true,})
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "No Thought found with this id!" });
          return;
        };
      })
      //is not getting to User.findOneAndUdate
    .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      // is this neccesary? 
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //DELETE to remove a thought by its _id
  //errors with deleting from user without having it in IP address
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        // return User.findOneAndUpdate(
        //   { _id: params.userId },
        //   { $pull: { thoughts: params.thoughtId } },
        //   { new: true }
        // );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // return the updated user data
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  ///api/thoughts/:thoughtId/reactions
  //POST to create a reaction stored in a single thought's reactions array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: {reactions: body } },
        { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            res.status(404).json({ message: "No thought found with this id!"});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },

  //DELETE to pull and remove a reaction by the reaction's reactionId value
  //api/thoughts/:thoughtId/reactions/:reactionId
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId} } },
        { new: true }
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
  }
};

module.exports = thoughtController;
