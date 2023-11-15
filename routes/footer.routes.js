
const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
const { check, validationResult }
    = require('express-validator');

    const footervalidationresult= [

      check('title', 'title length should be 2 to 20 characters')
                      .isLength({ min: 2, max: 20 }),
      check('links'),
  
                     
  ]    

/**
 * @swagger
 * definitions:
 *   footer:
 *     properties:
 *       title:
 *         type: string
 *       links:
 *         type: array
 *        
 */

//create
router.post('/', footervalidationresult,middlewareReponse.verifyToken, footerController.create,middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/footer:
 *   post:    
 *     security:           
 *      - Bearer: []
 *     tags:
 *       - footer
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new footer
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: The file to upload
 *       - in: formData
 *         name: links
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/footer'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',middlewareReponse.verifyToken,footerController.updatefooter, middlewareReponse.updateResponse);
   /**
 * @swagger
 * /api/v1/footer/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - footer
 *     description: Creates a new footer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: footer id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: links
 *         type: string
 *         schema:
 *           $ref: '#/definitions/footer'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareReponse.verifyToken,footerController.deletefooter, middlewareReponse.deleteResponse);
 /**
 * @swagger
 * /api/v1/footer/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - footer
 *     summary: Deletes a footer
 *     description: ''
 *     operationId: deletefooter
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: footer id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: footer not found   
 * 
 */
router.get('/',middlewareReponse.verifyToken,footerController.getfooter, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/footer:
 *   get:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - footer
 *     description: Returns all footer
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of footer       
 *         schema:
 *           $ref: '#/definitions/footer'
 *       400:
 *         description: Invalid status value 
 */
router.get('/id/:id',footerController.getfooterbyid);
/**
* @swagger
* /api/v1/footer/id/{id}: 
*   get:
*     tags:
*       - footer
*     description: get a single footer
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: footer id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/footer' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: footer not found
*/ 


module.exports=router;