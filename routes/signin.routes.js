
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');
const middlewareReponse = require('../middleware/response');
const { check, validationResult }
    = require('express-validator');

const signinvalidationresult = [
    check('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    check('password')

]

/**
 * @swagger
 * definitions:
 *   signin:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
router.post('/', signinvalidationresult,signinController.postdata);

/** 
* @swagger
* /api/v1/signin: 
*   post:
*     tags:
*       - signin
*     summary: signin a user
*     description: signin a  user
*     produces:
*       - application/json
*     parameters:
*       - name: Auth
*         description: user object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/signin'
*     responses:
*       200:
*         description: Successfully created
*/



module.exports = router;