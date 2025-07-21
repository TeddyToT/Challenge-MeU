const express = require("express")
const router = express.Router()
const UserController = require('../../controllers/usersController')
const validate = require('../../middlewares/validate')
const {createUserDTO, accessDTO} = require('../../dtos/user.dto')
router.post('/sign-up', createUserDTO, validate, UserController.signUp)
router.post('/log-in', accessDTO, validate, UserController.logIn)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 * /sign-up:
 *   post:
 *     summary: Sign Up
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
/**
 * @swagger
 * /log-in:
 *   post:
 *     summary: Log In
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string

 *     responses:
 *       201:
 *         description: Created
 */


module.exports = router