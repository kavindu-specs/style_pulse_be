const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const userController = require("../controllers/userController")

router.route('/').post(userController.saveUser)

router.route('/verify').post(userController.verifyUser)


module.exports = router;