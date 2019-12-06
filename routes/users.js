const router = require('express').Router();

const {
  getUsers,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatar);


module.exports = router;
