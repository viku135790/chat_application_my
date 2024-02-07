import express from 'express';
import { signin, signup } from '../controllers/user.js';
const router = express.Router();


/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Sign in user
 *     description: Use this endpoint to sign in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Sign in successful. Returns user information.
 *       '401':
 *         description: Unauthorized. Invalid email or password.
 */
router.post('/signin', signin);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up new user
 *     description: Use this endpoint to sign up a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '201':
 *         description: Sign up successful. Returns user information.
 *       '400':
 *         description: Bad request. Invalid input data.
 */
router.post('/signup', signup);


export default router;