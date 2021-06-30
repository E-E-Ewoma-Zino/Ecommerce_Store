// ALL ROUTES GOINT TO THE HOME "/" WILL BE IN THIS PAGE
const express = require("express");
const uploadPage = require(__dirname + "../../middleware/uploadPages");
const cart_controller = require(__dirname + "../../components/index/controller/cart");
const home_controller = require(__dirname + "../../components/index/controller/home");
const logIn_controller = require(__dirname + "../../components/index/controller/login");
const admin_controller = require(__dirname + "../../components/admin/controller/admin");
const signUp_controller = require(__dirname + "../../components/index/controller/signUp");
const logout_controller = require(__dirname + "../../components/index/controller/logout");
const error_404_controller = require(__dirname + "../../components/error/controller/404");
const contact_controller = require(__dirname + "../../components/index/controller/contact");
const category_controller = require(__dirname + "../../components/index/controller/category");
const cartItem_controller = require(__dirname + "../../components/index/controller/cartItem");
const checkout_controller = require(__dirname + "../../components/index/controller/checkout");

// TODO: FIND A WAY TO HANDLE ERRORS CAUSED BY NETWORK FAILURE ?


// This router is for the home / routes
const router = express.Router();

// @desc    uploadPages
uploadPage();

// @desc    Landing page
// @route   GET /
router.get("/", async (req, res) => home_controller(req, res));

// @desc    Category page
// @route   GET /category
router.get("/category", (req, res) => category_controller.get(req, res));

// @desc    For all searches
// @route   POST /category
router.post("/category", (req, res) => category_controller.post(req, res));

// @desc    Contact page
// @route   GET /contact
router.get("/contact", (req, res) => contact_controller(req, res));

// @desc    Cart page
// @route   GET /cart
router.get("/cart", (req, res) => cart_controller.get(req, res));

// @desc    Cart page
// @route   POST /cart
router.post("/cart", (req, res) => cart_controller.post(req, res));

// @desc    Cart page
// @route   DELETE /cart
router.delete("/cart", (req, res) => cart_controller.delete(req, res));

// @desc    no-page
// @route   get /cartitem
router.get("/cartitem", (req, res) => cartItem_controller.get(req, res));

// @desc    no-page
// @route   POST /cartitem
router.post("/cartitem", (req, res) => cartItem_controller.post(req, res));

// @desc    Checkout page
// @route   GET /checkout
router.get("/checkout", (req, res) => checkout_controller.get(req, res));

// @desc    Checkout page
// @route   POST /checkout
router.post("/checkout", (req, res) => checkout_controller.post(req, res));

// @desc    login page
// @route   GET /login
router.get("/login", (req, res) => logIn_controller.get(req, res));

// @desc    login page
// @route   POST /login
router.post("/login", (req, res, next) => logIn_controller.post(req, res, next));

// @desc    Signup page
// @route   GET /signup
router.get("/signup", (req, res) => signUp_controller.get(req, res));

// @desc    SignUp page
// @route   POST /signup
router.post("/signup", (req, res) => signUp_controller.post(req, res));

// @desc    Logout page
// @route   POST /signup
router.get("/logout", (req, res) => logout_controller(req, res));

// @desc    admin page
// @route   GET /admin
router.get("/admin", (req, res) => admin_controller(req, res));

// @desc    404 page
// @route   GET /404
router.get("", (req, res) => error_404_controller(req, res));
module.exports = router;