
const express = require('express');
const router = express.Router();
const contactusformController = require('../controllers/contactusformController');
const middlewareResponse = require('../middleware/response');
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');


const cantactusformvalidationresult= [
  check('youremail', 'youremail length should be 10 to 30 characters')
                  .isEmail().isLength({ min: 10, max: 30 }),
  check('yourname', 'yourname length should be 2 to 20 characters')
                  .isLength({ min: 2, max: 20 }),
  check('subject'),
  check('yourmessage')
                 
]
/**
 * @swagger
 * definitions:
 *   contactusform:
 *     properties:
 *       yourname:
 *         type: string
 *       youremail:
 *         type: string
 *       subject:
 *         type: string
 *       yourmessage:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload('contactusform').single('Image'),cantactusformvalidationresult,contactusformController.create,middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/contactusform:
 *   post:
 *     tags:
 *       - contactusform
 *     description: Creates a new contactusform
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/contactusform'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('contactusform').single('Image'),contactusformController.updatecontactusform, middlewareResponse.updateResponse);
  /**
 * @swagger
 * /api/v1/contactusform/{id}: 
 *   put:
 *     tags:
 *       - contactusform
 *     description: Creates a new contactusform
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: contactusform id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated contactusform object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/contactusform'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/',contactusformController.getcontactusform, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/contactusform:
 *   get:
 *     tags:
 *       - contactusform
 *     description: Returns all contactusform
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of contactusform       
 *         schema:
 *           $ref: '#/definitions/contactusform'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',contactusformController.getcontactusformbyid);
/**
* @swagger
* /api/v1/contactusform/{id}: 
*   get:
*     tags:
*       - contactusform
*     description: get a single contactusform
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: contactusform id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/contactusform' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: contactusform not found
*/ 

module.exports=router;