var express = require("express");
var router = express.Router();
var ContactController = require("../controllers/contact")

router.post('/contact', express.urlencoded({ extended: true }), ContactController);