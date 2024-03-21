const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const cartController = require("../controllers/cartController")

router.route('/').get(cartController.getCartItems)
router.route('/').post(cartController.addItems)

module.exports = router;