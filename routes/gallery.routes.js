
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const middlewareResponse = require('../middleware/response');
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');
  const galleryvalidationresult= [

    check('title'),
    check('Image'),
    // check('is_multiple'),
    check('sortorder'),
    check('Image'),
    check('status'),
    check('page')
                   
]
/**
 * @swagger
 * definitions:
 *   gallery:
 *     properties:
 *       title:
 *         type: string
 *       Image:
 *         type: array
 *       status:
 *         type: string
 *       sortorder:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload('gallery').single('Image'),galleryvalidationresult, galleryController.create, middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/gallery:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - gallery
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new gallery
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: page
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         schema:
 *           $ref: '#/definitions/gallery'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/:id', upload('gallery').single('Image'), galleryController.updategallery, middlewareResponse.updateResponse);
 /**
 * @swagger
 * /api/v1/gallery/{id}: 
 *   put:
 *     tags:
 *       - gallery
 *     description: Creates a new gallery
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: gallery id to Update
 *         required: true
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: page
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *         schema:
 *           $ref: '#/definitions/gallery'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', galleryController.deletegallery, middlewareResponse.deleteResponse);
/**
* @swagger
* /api/v1/gallery/{id}: 
*   delete:
*     tags:
*       - gallery
*     summary: Deletes a gallery
*     description: ''
*     operationId: deletegallery
*     produces:
*       - application/xml
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: galleryid to delete
*         required: true
*         type: string
*     responses:
*       '400':
*         description: Invalid ID supplied
*       '404':
*         description: gallery not found   
* 
*/
router.get('/', galleryController.getgallery, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/gallery:
 *   get:
 *     tags:
 *       - gallery
 *     description: Returns all gallery
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of gallery       
 *         schema:
 *           $ref: '#/definitions/gallery'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id', galleryController.getgallerybyid);
/**
* @swagger
* /api/v1/gallery/{id}: 
*   get:
*     tags:
*       - gallery
*     description: get a single gallery
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: gallery id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/gallery' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: gallery not found
*/
router.get('/list/status/', galleryController.getgallerystatus, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/gallery/list/status/:
 *   get:
 *     tags:
 *       - gallery
 *     description: Returns status gallery
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of gallery       
 *         schema:
 *           $ref: '#/definitions/gallery'
 *       400:
 *         description: Invalid status value 
 */

module.exports = router;
