const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateAvatar, validateUserId } = require('../middlwares/validation'); // validateUpdateUser

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = router;
