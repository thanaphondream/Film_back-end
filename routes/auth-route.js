const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')
const ProductController = require('../controllers/product-controller')
const Restaurants = require("../controllers/RestaurantsId")
const products = require('../controllers/productdetell')
const adminController = require('../controllers/admin-controller')
const address = require('../controllers/productdetell')




const userpay = require('../controllers/userpayment')
const { route } = require('./todo-route')
const { orders } = require('../models/db')

const update = require('../middlewares/upload')


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/res', Restaurants.createRestaurants)
router.post('/payment', products.payments);


router.get('/me', authenticate, authController.getme) 
router.get('/getproduct', authenticate, ProductController.getproduct) 
router.post('/product', update.array("image", 1), ProductController.createProduct)
router.get ('/getproduct/:id', products.orderdate)
router.get('/user', authenticate,userpay.userid)
router.get('/getorder',authenticate,adminController.getorders)
router.get('/userorders', authenticate,products.userorder)
router.delete("/delete/:productId", adminController.deleteproduct)
router.get('/useraddress',authenticate,address.useraddress)
router.post('/addUserAddress',authenticate,address.addUserAddress)
router.get('/admingetaddress',authenticate,adminController.admingetAddress)
router.get('/getuserdetails',authenticate,adminController.getUserDetails)
router.get('/getorderadmin',authenticate,adminController.getadminorder)

router.put('/products/:id', ProductController.updatestock)
module.exports = router