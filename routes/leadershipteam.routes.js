
const express = require('express');
const router = express.Router();
const leadershipteamController = require('../controllers/leadershipteamController');
const middlewareResponse = require('../middleware/response');
let {upload} = require('../services/file_upload');
const { check, validationResult }
  = require('express-validator');

  const leadershipteamvalidationresult= [

    check('name'),
    check('designation'),
    check('status'),
    check('description')
                   
  ]

/**
 * @swagger
 * definitions:
 *   leadershipteam:
 *     properties:
 *       name :
 *         type: string
 *       designation:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *       Image:
 *         type: string
 *       
 *        
 */
//create
router.post('/',upload('leadershipteam').single('Image'),leadershipteamvalidationresult, middlewareResponse.verifyToken, leadershipteamController.create,middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/leadershipteam:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - leadershipteam
  *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new leadershipteam
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Image
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: designation
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/leadershipteam'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',upload('leadershipteam').single('Image'),middlewareResponse.verifyToken,leadershipteamController.updateleadershipteam, middlewareResponse.updateResponse);
  /**
 * @swagger
 * /api/v1/leadershipteam/{id}: 
 *   put:
 *     security:           
 *       - Bearer: []     
 *     tags:
 *       - leadershipteam
 *     description: Creates a new leadershipteam
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: leadershipteam id to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: name
 *         type: string
 *       - in: formData
 *         name: url
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/leadershipteam'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete('/:id', middlewareResponse.verifyToken,leadershipteamController.deleteleadershipteam, middlewareResponse.deleteResponse);
  /**
 * @swagger 
 * /api/v1/leadershipteam/{id}: 
 *   delete:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - leadershipteam
 *     summary: Deletes a leadershipteam
 *     description: ''
 *     operationId: deleteleadershipteam
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: leadershipteam id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: leadershipteam not found   
 * 
 */ 
router.get('/',leadershipteamController.getleadershipteam, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/leadershipteam:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - leadershipteam
 *     description: Returns all leadershipteam
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of leadershipteam       
 *         schema:
 *           $ref: '#/definitions/leadershipteam'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id',leadershipteamController.getleadershipteambyid);
/**
* @swagger
* /api/v1/leadershipteam/{id}: 
*   get:
*     tags:
*       - leadershipteam
*     description: get a single leadershipteam
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: leadershipteam id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/leadershipteam' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: leadershipteam not found
*/


module.exports=router;