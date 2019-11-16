const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
