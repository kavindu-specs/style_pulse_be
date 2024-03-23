const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const cartController = require("../controllers/cartController")

router.route('/').get(cartController.getCartItems)
router.route('/').post(cartController.addItems)
router.route('/:code').delete(cartController.removeItems)

module.exports = router;