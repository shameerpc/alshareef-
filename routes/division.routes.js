const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');

  const divisionvalidationresult= [
    check('divisionName'),
    check('description'),
    check('is_multiple'),
    check('sortorder'),
    check('Image'),
    check('status'),
    check('page')
                   
]
/**
 * @swagger
 * definitions:
 *   division:
 *     properties:
 *       divisionName:
 *         type: string
 *       is_multiple:
 *         type: string
 *       Image:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: Boolean
 *       createdby:
 *         type: string
 *       pages:
 *         type: array
 */
//create
router.post('/', upload('division').single('Image'),divisionvalidationresult,middlewareReponse.verifyToken,divisionController.create,middlewareReponse.saveResponse);

/**
 * @swagger
 * /api/v1/division:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - division
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new division
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: divisionName
 *         type: string
 *         required: true
 *       - in: formData
 *         name: pagesId
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: is_multiple
 *         type: number
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *         required: true
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/division'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('division').single('Image'),middlewareReponse.verifyToken,divisionController.updatedivision, middlewareReponse.updateResponse);
  /**
 * @swagger
 * /api/v1/division/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - division
 *     description: update a new division
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: division id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: pagesId
 *         type: string
 *       - in: formData
 *         name: is_multiple
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: divisionName
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/division'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id',middlewareReponse.verifyToken, divisionController.deletedivision, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/division/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - division
 *     summary: Deletes a division
 *     description: ''
 *     operationId: deletedivision
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: division id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: division not found   
 * 
 */  
router.get('/',divisionController.getdivision, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/division:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - division
 *     description: Returns all division
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of division       
 *         schema:
 *           $ref: '#/definitions/division'
 *       400:
 *         description: Invalid status value 
 */
// router.get('/:slug',divisionController.getbyslug, middlewareReponse.getByIdResponse);
// /**
// * @swagger
// * /api/v1/division/{slug}: 
// *   get:
// *     tags:
// *       - division
// *     description: get a single slug
// *     produces:
// *        - application/json
// *     parameters:
// *       - name: slug
// *         in: path
// *         description: slug to view
// *         required: true
// *         type: string
// *     responses:
// *       200:
// *         description: successful operation
// *         schema:
// *           $ref: '#/definitions/division' 
// *       400:
// *          description: Invalid ID supplied
// *       404:
// *         description: division not found
// */ 
router.get('/id/:id',divisionController.getdivisionbyid);
/**
* @swagger
* /api/v1/division/id/{id}: 
*   get:
*     tags:
*       - division
*     description: get a single division
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: division id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/division' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: division not found
*/ 
router.get('/status/',  divisionController.getdivisionstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/division/status/:
 *   get:
 *     tags:
 *       - division
 *     description: Returns status division
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of division       
 *         schema:
 *           $ref: '#/definitions/division'
 *       400:
 *         description: Invalid status value 
 */



module.exports = router;