import express from 'express';
import { commentPost, getPostPagination, getPostById, getPostBySearch, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from "../middleware/auth.js"

const router = express.Router();

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Search for posts
 *     description: Use this endpoint to search for posts based on specific criteria.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to filter posts.
 *     responses:
 *       '200':
 *         description: A successful response, returning posts that match the search criteria.
 *       '404':
 *         description: No posts found based on the search criteria.
 */
router.get('/search', getPostBySearch)

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a specific post by ID
 *     description: Use this endpoint to retrieve a specific post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve.
 *     responses:
 *       '200':
 *         description: A successful response, returning the specified post.
 *       '404':
 *         description: Post not found.
 */
router.get('/:id', getPostById)


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Use this endpoint to retrieve all posts.
 *     responses:
 *       '200':
 *         description: A successful response, returning all posts.
 *       '404':
 *         description: No posts found.
 */
router.get('/', getPost)

/**
 * @swagger
 * /posts/page:
 *   get:
 *     summary: Get paginated posts
 *     description: Use this endpoint to retrieve paginated posts.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response, returning paginated posts.
 *       '404':
 *         description: No posts found for the specified page.
 */
router.get('/page', getPostPagination)

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Use this endpoint to retrieve all posts.
 *     responses:
 *       '200':
 *         description: A successful response, returning all posts.
 *       '404':
 *         description: No posts found.
 *   post:
 *     summary: Create a new post
 *     description: Use this endpoint to create a new post.
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "tttttt"
 *               message:
 *                 type: string
 *                 example: "tttttt"
 *               creater:
 *                 type: string
 *                 example: "ttttti"
 *               tags:
 *                 type: string
 *                 example: "uuu"
 *     responses:
 *       '201':
 *         description: Post created successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 */
router.post('/', auth, createPost)

/**
 * @swagger
 * /posts/{postId}:
 *   patch:
 *     summary: Update specific fields of a post
 *     description: Use this endpoint to update specific fields of a post by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               message:
 *                 type: string
 *                 example: "Updated Message"
 *               tags:
 *                 type: string
 *                 example: "updated-tag"
 *     responses:
 *       '200':
 *         description: Post updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: Post not found.
 */
router.patch('/:id', auth, updatePost)

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     description: Use this endpoint to delete a specific post by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete.
 *     responses:
 *       '204':
 *         description: Post deleted successfully.
 *       '404':
 *         description: Post not found.
 */
router.delete('/:id', auth, deletePost)

/**
 * @swagger
 * /posts/{postId}/likepost:
 *   patch:
 *     summary: Like a post
 *     description: Use this endpoint to like a specific post by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to like.
 *     responses:
 *       '200':
 *         description: Post liked successfully.
 *       '404':
 *         description: Post not found.
 */
router.patch('/:id/likepost', auth, likePost)

/**
 * @swagger
 * /posts/{postId}/commentPost:
 *   post:
 *     summary: Comment on a post
 *     description: Use this endpoint to add a comment to a specific post by its ID.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to comment on.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Great post!"
 *     responses:
 *       '201':
 *         description: Comment added successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: Post not found.
 */
router.post('/:id/commentPost', auth, commentPost)

export default router;