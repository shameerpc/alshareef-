
const express = require('express');
const router = express.Router();
const emailsubscriptionController = require('../controllers/emailsubscriptionController');
const middlewareReponse = require('../middleware/response');
const { check, validationResult }
    = require('express-validator');
const emailsubscriptionvalidationresult= [
    check('email')                
]


/**
 * @swagger
 * definitions:
 *   emailsubscription:
 *     properties:
 *       email:
 *         type: string
 *       status:
 *         type: string
 *       unsubscribeDate:
 *         type: string
 *
 */

//create
router.post('/', emailsubscriptionvalidationresult, emailsubscriptionController.checkemail,middlewareReponse.saveResponse);

/**
 * @swagger
 * /api/v1/emailsubscription:
 *   post:
 *     tags:
 *       - emailsubscription
 *     description: Creates a new emailsubscription
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         descrition: emailsubscription object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/emailsubscription'
 *     responses:
 *       200:
 *         description: Successfully created
 */


module.exports=router;