const { User, Thought } = require('../models');

const userController = {
      // get all Users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        // If no User is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      //there is also .updateOne and .updateMany
      // new:true instructs Mongoose to return the new version of the document instead of the original
      //(which would happen if we didn't include this as a third parameter)
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      //there is also .deleteOne and .deleteMany
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

//   // createFriend
//   createFriend({ body }, res) {
//     User.create(body)
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => res.status(400).json(err));
//   },

//     // delete Friend
//     deleteFriend({ params }, res) {
//         User.findOneAndDelete({ _id: params.id })
//           //there is also .deleteOne and .deleteMany
//           .then(dbUserData => {
//             if (!dbUserData) {
//               res.status(404).json({ message: 'No User found with this id!' });
//               return;
//             }
//             res.json(dbUserData);
//           })
//           .catch(err => res.status(400).json(err));
//   }
};


router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);

module.exports = userController;
