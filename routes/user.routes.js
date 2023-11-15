
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');

/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       roles:
 *         type: string
 *       
 *        
 */
//create
router.post('/',  middlewareReponse.verifyToken, userController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - user
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/:id', middlewareReponse.verifyToken,userController.updateuser, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/user/{id}: 
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - user
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: user id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated user object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */



router.delete('/:id', middlewareReponse.verifyToken, userController.deleteuser, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/user/{id}: 
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - user
 *     summary: Deletes a user
 *     description: ''
 *     operationId: deleteuser
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: user id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: user not found   
 * 
 */
router.get('/', middlewareReponse.verifyToken,userController.getuser, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - user
 *     description: Returns all user
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of user       
 *         schema:
 *           $ref: '#/definitions/user'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id', middlewareReponse.verifyToken,userController.getusersbyid);
/**
* @swagger
* /api/v1/user/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - user
*     description: get a single user
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: user id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/user' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: user not found
*/


module.exports=router;