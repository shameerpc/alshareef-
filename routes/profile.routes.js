


const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const middlewareReponse = require('../middleware/response');
const multer  = require('multer')
let {upload} = require('../services/file_upload');


/**
 * @swagger
 * definitions:
 *   profile:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       image:
 *         type: string
 *       currentpassword:
 *         type: Boolean
 *       newpassword:
 *         type: string
 *       password:
 *         type: string
 *       
 *        
 */
//router.post('/', profileController.postdata,upload.single('image'), middlewareReponse.verifyToken);
router.put('/:id', upload('pages').single('Image'),middlewareReponse.verifyToken,profileController.updateprofile);
  /**
 * @swagger
 * /api/v1/profile/{id}: 
 *   put:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - profile
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: id
 *         type: string
 *         description: profile id to view
 *         required: true
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: username
 *         type: string
 *       - in: formData
 *         name: email
 *         type: string
 *       - in: formData
 *         name: currentpassword
 *         type: string
 *       - in: formData
 *         name: newpassword
 *         type: string
 *         schema:
 *           $ref: '#/definitions/profile'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/:id',middlewareReponse.verifyToken, profileController.getuser);
/**
* @swagger
* /api/v1/profile/{id}: 
*   get:
*     security:           
*       - Bearer: []
*     tags:
*       - profile
*     description: get a single profile
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: profile id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/profile' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: profile not found
*/ 




module.exports = router;