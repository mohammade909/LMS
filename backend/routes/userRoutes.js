const experss = require("express");
const router = experss.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const {
 markAttendance, requestLeave, approveLeave, getAllAttendances, declineLeave,
  getUsers,
} = require("../controllers/userController");

router.get("/",   getUsers);
router.post('/attendance', markAttendance);
router.get('/attendance', getAllAttendances);

// Leave request routes
router.post('/leave/request', requestLeave);
router.post('/leave/approve', approveLeave);
router.post('/leave/decline', declineLeave);

module.exports = router;
