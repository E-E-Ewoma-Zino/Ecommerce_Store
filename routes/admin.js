// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const express = require("express");
const upload = require(__dirname + "../../config/multer");
const login = require(__dirname + "../../components/admin/controller/login");
const orders = require(__dirname + "../../components/admin/controller/order");
const products = require(__dirname + "../../components/admin/controller/products");
const settings = require(__dirname + "../../components/admin/controller/settings");
const category = require(__dirname + "../../components/admin/controller/category");
const dashboard = require(__dirname + "../../components/admin/controller/dashboard");
const addProduct = require(__dirname + "../../components/admin/controller/addProduct");
const categoryAPI = require(__dirname + "../../components/admin/controller/categoryAPI");
const productsAPI = require(__dirname + "../../components/admin/controller/productsAPI");
const editproduct = require(__dirname + "../../components/admin/controller/edit_product");
const orderdetails = require(__dirname + "../../components/admin/controller/orderDetails");

// This router is for the home / routes
const router = express.Router();


// @desc    login page
// @route   GET /admin/login
router.get("/login", (req, res) => login.get(req, res));

// @desc    login page
// @route   POST admin/login
router.post("/login", upload.array("img"), (req, res) => login.post(req, res));

// @desc    dashboard page
// @route   GET /admin/dashboard
router.get("/dashboard", (req, res) => dashboard.get(req, res));

// @desc    products page
// @route   GET /admin/products
router.get("/products", (req, res) => products.get(req, res));

// @desc    products API
// @route   GET /admin/products
router.get("/productsAPI", (req, res) => productsAPI.get(req, res));

// @desc    products API
// @route   DELETE /admin/products
router.delete("/productsAPI", (req, res) => productsAPI.delete(req, res));

// @desc    orders page
// @route   GET /admin/orders
router.get("/orders", (req, res) => orders.get(req, res));

// @desc    orderdetails page
// @route   GET /admin/orderdetails
router.get("/orderdetails", (req, res) => orderdetails.get(req, res));

// @desc    category page
// @route   GET /admin/category
router.get("/category", (req, res) => category.get(req, res));

// @desc    category API
// @route   GET /admin/categoryAPI
router.get("/categoryAPI", (req, res) => categoryAPI.get(req, res));

// @desc    category API
// @route   POST /admin/categoryAPI
router.post("/categoryAPI", (req, res) => categoryAPI.post(req, res));

// @desc    category API
// @route   DELETE /admin/categoryAPI
router.delete("/categoryAPI", (req, res) => categoryAPI.delete(req, res));

// @desc    settings page
// @route   GET /admin/settings
router.get("/settings", (req, res) => settings.get(req, res));

// @desc    AddProduct page
// @route   GET /admin/AddProduct
router.get("/addProduct", (req, res) => addProduct.get(req, res));

// @desc    AddProduct page
// @route   POST admin/addProduct
router.post("/addProduct", upload.array("img"), (req, res) => addProduct.post(req, res));

// @desc    edit products page
// @route   GET /admin/edit/:productId
router.get("/edit/:productId", (req, res) => editproduct.get(req, res));

// @desc    edit products page
// @route   POST /admin/edit/:productId
router.post("/edit/:productId", upload.array("img"), (req, res) => editproduct.post(req, res));

module.exports = router;