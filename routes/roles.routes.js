
const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');

/**
 * @swagger
 * definitions:
 *   roles:
 *     properties:
 *       name:
 *         type: string
 *       permissions:
 *         type: array
 *         items:
 *           type: string
 *       
 *        
 */
//create
router.post('/',  middlewareReponse.verifyToken,rolesController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - roles
 *     description: Creates a new roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/roles'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id', middlewareReponse.verifyToken,rolesController.updateroles, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/roles/{id}: 
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - roles
 *     description: Creates a new roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: roles id to Update
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated roles object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/roles'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,rolesController.deleteroles, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/roles/{id}: 
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - roles
 *     summary: Deletes a roles
 *     description: ''
 *     operationId: deleteroles
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: roles id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: contactus not found   
 * 
 */
router.get('/', middlewareReponse.verifyToken,rolesController.getroles, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - roles
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of roles       
 *         schema:
 *           $ref: '#/definitions/roles'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id', middlewareReponse.verifyToken,rolesController.getrolesbyid);
/**
* @swagger
* /api/v1/roles/{id}: 
*   get:
*     security:
*       - Bearer: []
*     tags:
*       - roles
*     description: get a single roles
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: roles id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/roles' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: ourteam not found
*/


module.exports=router;