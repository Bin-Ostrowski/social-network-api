const { User } = require("../models");

const userController = {
  //get all Users - GET /api/users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //GET a single user by its _id and populated thought and friend data
  //GET /api/users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //POST a new user:
  //POST /api/users
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a user by its _id
  //PUT /api/users/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE to remove user by its _id
  deleteUser({ params }, res) {
    User.findOneAndDelete(
        { _id: params.id },
        //BONUS: Remove a user's associated thoughts when deleted.
        { $pull: {thoughts: {thoughtId: params._id}}},
        )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  ///api/users/:userId/friends/:friendId
  //POST to add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: {friends: params._id } },
        { new: true }
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No User found with this id!"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },
  //DELETE to remove a friend from a user's friend list
   ///api/users/:userId/friends/:friendId
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: { _id: params._id} } },
        { new: true }
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.json(err));
  }
};

module.exports = userController;
