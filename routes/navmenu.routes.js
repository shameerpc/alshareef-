
const express = require('express');
const router = express.Router();
const navmenuController = require('../controllers/navmenuController');
const middlewareReponse = require('../middleware/response');
const { check, validationResult }
  = require('express-validator');

  const navmenuvalidationresult= [

    check('name'),
    check('url'),
    check('status'),
    check('sortorder')
                   
  ]

/**
 * @swagger
 * definitions:
 *   navmenu:
 *     properties:
 *       name :
 *         type: string
 *       url:
 *         type: string
 *       status:
 *         type: string
 *       sortorder:
 *         type: string
 *       slug:
 *         type: string
 *       
 *        
 */
//create
router.post('/',navmenuvalidationresult, middlewareReponse.verifyToken, navmenuController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/navmenu:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - navmenu
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new navmenu
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: url
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         schema:
 *           $ref: '#/definitions/navmenu'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',middlewareReponse.verifyToken,navmenuController.updatenavmenu, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/navmenu/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []     
 *     tags:
 *       - navmenu
 *     description: Creates a new navmenu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: navmenu id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: url
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         schema:
 *           $ref: '#/definitions/navmenu'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,navmenuController.deletenavmenu, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/navmenu/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - navmenu
 *     summary: Deletes a navmenu
 *     description: ''
 *     operationId: deletenavmenu
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: navmenu id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: navmenu not found   
 * 
 */ 
router.get('/',navmenuController.getnavmenu, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/navmenu:
 *   get:
 *     tags:
 *       - navmenu
 *     description: Returns all navmenu
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of navmenu       
 *         schema:
 *           $ref: '#/definitions/navmenu'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',navmenuController.getnavmenubyid);
/**
* @swagger
* /api/v1/navmenu/{id}: 
*   get:
*     tags:
*       - navmenu
*     description: get a single navmenu
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: navmenu id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/navmenu' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: navmenu not found
*/

router.get('/get/status',navmenuController.getnavmenubystatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/navmenu/get/status:
 *   get:
 *     tags:
 *       - navmenu
 *     description: Returns all navmenu
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of navmenu       
 *         schema:
 *           $ref: '#/definitions/navmenu'
 *       400:
 *         description: Invalid status value 
 */
module.exports=router;