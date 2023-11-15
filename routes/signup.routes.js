const express = require('express');
const rateLimit = require('express-rate-limit');


const router = express.Router();
const signup = require('../controllers/signupController');
const middlewareReponse = require('../middleware/response');
const { check, validationResult }
  = require('express-validator');

  const signupvalidationresult= [
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('username', 'Name length should be 2 to 20 characters')
                    .isLength({ min: 2, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8, max: 10 })
    
                   
]
/**
 * @swagger
 * definitions:
 *   signup:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

router.post("/",signupvalidationresult,signup.postdata)

/** 
* @swagger
* /api/v1/signup: 
*   post:
*     tags:
*       - signup
*     summary: Create a user
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Auth
*         description: user object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/signup'
*     responses:
*       200:
*         description: Successfully created
*/



module.exports=router;