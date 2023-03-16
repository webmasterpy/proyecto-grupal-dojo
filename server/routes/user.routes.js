const { Router } = require("express");
const authController = require("../controllers/user.controller");
const { authToken } = require("../middleware/authToken")

const router = Router();

router.post("/api/signup", authController.signup_post);
router.post("/api/login", authController.login_post);
router.get("/api/logout", authController.logout_get);
router.get("/api/authUser", authToken);
router.post("/api/loginAdmin", authController.login_admin);

module.exports = router;