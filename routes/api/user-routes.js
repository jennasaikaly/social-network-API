
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
//     // createFriend,
//     // deleteFriend
  } = require('../../controllers/user-controller');

// // // Set up GET all and POST at /api/users
// // // /api/users
router
   .route('/')
  .get(getAllUsers)
  .post(createUser);

// // // Set up GET one, PUT, and DELETE at /api/users/:id
// // // /api/users/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);  
//   // BONUS: Remove a user's associated thoughts when deleted

//   //POST to add a new friend to a user's friend list
//   //DELETE to delete a friend from a user's friend list
//   // /api/users/:userId/friends/:friendId
//   router
//   .route('/:userId/friends/:friendId')
//   // .post(createFriend)
//   // .delete(deleteFriend);

module.exports = router;