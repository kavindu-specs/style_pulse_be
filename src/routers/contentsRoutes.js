const express = require("express")
const errorHandler = require("../middlewares/error")
const router = express.Router()

const contentsController = require("../controllers/contentsController")


router.route('/banners').get(contentsController.getBanners)

module.exports = router;