
const express = require('express');
const router = express.Router();
const ourteamController = require('../controllers/ourteamController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');

/**
 * @swagger
 * definitions:
 *   ourteam:
 *     properties:
 *       Name:
 *         type: string
 *       description:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       sortorder:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload('ourteam').single('Image'),middlewareReponse.verifyToken, ourteamController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/ourteam:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - ourteam
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new ourteam
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: Name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ourteam'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('ourteam').single('Image'),middlewareReponse.verifyToken,ourteamController.updateourteam, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/ourteam/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - ourteam
 *     description: Creates a new ourteam
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ourteam id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: Name
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *         schema:
 *           $ref: '#/definitions/ourteam'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,ourteamController.deleteourteam, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/ourteam/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - ourteam
 *     summary: Deletes a ourteam
 *     description: ''
 *     operationId: deleteourteam
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ourteam id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: ourteam not found   
 * 
 */ 
router.get('/',middlewareReponse.verifyToken,ourteamController.getourteam, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/ourteam:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - ourteam
 *     description: Returns all ourteam
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of ourteam       
 *         schema:
 *           $ref: '#/definitions/ourteam'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',ourteamController.getourteambyid);
/**
* @swagger
* /api/v1/ourteam/{id}: 
*   get:
*     tags:
*       - ourteam
*     description: get a single ourteam
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: ourteam id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/ourteam' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: ourteam not found
*/
router.get('/team/status/',  ourteamController.getourteamsstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/ourteam/team/status/:
 *   get:
 *     tags:
 *       - ourteam
 *     description: Returns status ourteam
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of ourteam       
 *         schema:
 *           $ref: '#/definitions/ourteam'
 *       400:
 *         description: Invalid status value 
 */

module.exports=router;