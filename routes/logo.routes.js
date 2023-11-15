const express = require('express');
const router = express.Router();
const logoController = require('../controllers/logoController');
const middlewareReponse = require('../middleware/response');
let {upload} = require('../services/file_upload');
const { check, validationResult }
    = require('express-validator');
 
    const logovalidationresult= [

      check('title', 'title length should be 2 to 20 characters')
                      .isLength({ min: 2, max: 20 }),
      check('logoUrl')
                     
  ]
/**
 * @swagger
 * definitions:
 *   logo:
 *     properties:
 *       title:
 *         type: string
 *       logoUrl:
 *         type: string
 */
//create
router.post('/', upload('logo').single('logoUrl'),logovalidationresult,logoController.create,middlewareReponse.saveResponse)

/**
 * @swagger
 * /api/v1/logo:
 *   post:
 *     tags:
 *       - logo
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new logos
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: logoUrl
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/logo'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('logo').single('logoUrl'),logoController.updatelogo, middlewareReponse.updateResponse);
 /**
* @swagger
* /api/v1/logo/{id}: 
*   put:  
*     tags:
*       - logo
*     description: Creates a new logo
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: logo id to Update
*         required: true
*         type: string
*       - in: formData
*         name: logoUrl
*         type: file
*         description: The file to upload
*       - in: formData
*         name: title
*         type: string
*         schema:
*           $ref: '#/definitions/logo'
*     responses:
*       200:
*         description: Successfully created
*/
router.delete('/:id', logoController.deletelogo, middlewareReponse.deleteResponse);
  /**
 * @swagger
 * /api/v1/logo/{id}: 
 *   delete:
 *     tags:
 *       - logo
 *     summary: Deletes a logo
 *     description: ''
 *     operationId: deletelogo
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: logo id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: logo not found   
 * 
 */  
router.get('/',logoController.getlogo, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/logo:
 *   get:
 *     tags:
 *       - logo
 *     description: Returns all logo
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of logo       
 *         schema:
 *           $ref: '#/definitions/logo'
 *       400:
 *         description: Invalid status value 
 */



module.exports = router;