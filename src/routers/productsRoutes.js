const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const productsController = require("../controllers/productsController")

router.route('/:code').get(productsController.getProduct)
router.route('/').get(productsController.getproducts)


module.exports = router;