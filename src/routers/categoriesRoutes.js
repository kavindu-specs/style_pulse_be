const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const categoriesController = require("../controllers/categoriesController")

router.route('/:code').get(categoriesController.getCategory)
router.route('/').get(categoriesController.getCategories)

module.exports = router;