const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const cartController = require("../controllers/cartController")

router.route('/').get(cartController.getCartItems)
router.route('/').post(cartController.addItems)
router.route('/:deviceId/:code').delete(cartController.removeItems)
router.route('/').put(cartController.updateQuantity )

router.route('/varient').put(cartController.updateItemVarient)

module.exports = router;