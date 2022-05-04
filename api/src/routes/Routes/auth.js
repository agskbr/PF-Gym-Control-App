const { Router }= require ('express')
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const {User} = require ('../../db')




















module.exports = router;