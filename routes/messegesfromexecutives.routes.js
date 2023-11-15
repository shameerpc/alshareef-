
const express = require('express');
const router = express.Router();
const messegesfromexecutivesController = require('../controllers/messegesfromexecutivesController');
const middlewareResponse = require('../middleware/response');
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');


const messegesfromexecutivesvalidationresult= [
  check('name'),
  check('designation'),
  check('messege'),
  check('status')
                 
]
/**
 * @swagger
 * definitions:
 *   messegesfromexecutives:
 *     properties:
 *       name:
 *         type: string
 *       designation:
 *         type: string
 *       messege:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload('messegesfromexecutives').single('Image'),messegesfromexecutivesvalidationresult,middlewareResponse.verifyToken,messegesfromexecutivesController.create,middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/messegesfromexecutives:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - messegesfromexecutives
 *     description: Creates a new messegesfromexecutives
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: designation
 *         type: string
 *         required: true
 *       - in: formData
 *         name: messege
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('messegesfromexecutives').single('Image'),middlewareResponse.verifyToken,messegesfromexecutivesController.updatemessegesfromexecutives, middlewareResponse.updateResponse);
  /**
 * @swagger
 * /api/v1/messegesfromexecutives/{id}: 
 *   put:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - messegesfromexecutives
 *     description: Creates a new messegesfromexecutives
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: designation
 *         type: string
 *         required: true
 *       - in: formData
 *         name: messege
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/messegesfromexecutives'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/',messegesfromexecutivesController.getmessegesfromexecutives, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/messegesfromexecutives:
 *   get:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - messegesfromexecutives
 *     description: Returns all messegesfromexecutives
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of messegesfromexecutives       
 *         schema:
 *           $ref: '#/definitions/messegesfromexecutives'
 *       400:
 *         description: Invalid status value 
 */
router.delete('/:id', middlewareResponse.verifyToken,messegesfromexecutivesController.deletemessegesfromexecutives, middlewareResponse.deleteResponse);
  /**
 * @swagger 
 * /api/v1/messegesfromexecutives/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - messegesfromexecutives
 *     summary: Deletes a messegesfromexecutives
 *     description: ''
 *     operationId: deletemessegesfromexecutives
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: messegesfromexecutives id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: messegesfromexecutives not found   
 * 
 */ 
router.get('/:id',messegesfromexecutivesController.getmessegesfromexecutivesbyid);
/**
* @swagger
* /api/v1/messegesfromexecutives/{id}: 
*   get:
*     tags:
*       - messegesfromexecutives
*     description: get a single messegesfromexecutives
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: messegesfromexecutives id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/messegesfromexecutives' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: messegesfromexecutives not found
*/ 

module.exports=router;