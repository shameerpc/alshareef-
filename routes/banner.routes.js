
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const middlewareReponse = require('../middleware/response');
const multer = require('multer')
const { check, validationResult }
  = require('express-validator');
// let upload = require('../middleware/bannerupload');
let {upload} = require('../services/file_upload');


const bannervalidationresult= [

    check('title', 'title length should be 2 to 20 characters')
                    .isLength({ min: 2, max: 20 }),
    check('status'),
    check('description'),
    check('sortorder'),
    check('Image'),
    check('buttonurl'),
    check('buttontext')
                   
]
/**
 * @swagger
 * definitions:
 *   banner:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       createdby:
 *         type: string
 *       sortorder:
 *         type: string
 *       buttonurl:
 *         type: string
 *       buttontext:
 *         type: string
 *        
 */


//create
router.post('/',  upload('banner').single('Image'),bannervalidationresult,middlewareReponse.verifyToken, bannerController.create, middlewareReponse.saveResponse);
/**
 * @swagger
 * /api/v1/banner:
 *   post:    
 *     security:           
 *      - Bearer: []
 *     tags:
 *       - banner
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new banner
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
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *       - in: formData
 *         name: buttonurl
 *         type: string
 *         required: true
 *       - in: formData
 *         name: buttontext
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/banner'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',  upload('banner').single('Image'),middlewareReponse.verifyToken, bannerController.updatebanner, middlewareReponse.updateResponse);
/**
* @swagger
* /api/v1/banner/{id}: 
*   put:
*     security:           
*       - Bearer: []     
*     tags:
*       - banner
*     description: Creates a new banner
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: banner id to Update
*         required: true
*         type: string
*       - in: formData
*         name: Image
*         type: file
*         description: The file to upload
*       - in: formData
*         name: title
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
*       - in: formData
*         name: userId
*         type: string
*       - in: formData
*         name: buttonurl
*         type: string
*       - in: formData
*         name: buttontext
*         type: string
*         schema:
*           $ref: '#/definitions/banner'
*     responses:
*       200:
*         description: Successfully created
*/
router.delete('/:id', middlewareReponse.verifyToken, bannerController.deletebanner, middlewareReponse.deleteResponse);
/**
* @swagger
* /api/v1/banner/{id}: 
*   delete:
*     security:           
*       - Bearer: []
*     tags:
*       - banner
*     summary: Deletes a banner
*     description: ''
*     operationId: deletebanner
*     produces:
*       - application/xml
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: banner id to delete
*         required: true
*         type: string
*     responses:
*       '400':
*         description: Invalid ID supplied
*       '404':
*         description: banner not found   
* 
*/
router.get('/',  middlewareReponse.verifyToken, bannerController.getbanner, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/banner:
 *   get:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - banner
 *     description: Returns al banner
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of bannner       
 *         schema:
 *           $ref: '#/definitions/banner'
 *       400:
 *         description: Invalid status value 
 */
router.get('/id/:id', bannerController.getbannerbyid);
/**
* @swagger
* /api/v1/banner/id/{id}: 
*   get:
*     tags:
*       - banner
*     description: get a single banner
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: banner id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/banner' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: banner not found
*/
router.get('/status/',  bannerController.getbannerstatus, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/banner/status/:
 *   get:
 *     tags:
 *       - banner
 *     description: Returns status banner
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of bannner       
 *         schema:
 *           $ref: '#/definitions/banner'
 *       400:
 *         description: Invalid status value 
 */
module.exports = router;