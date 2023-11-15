const express = require('express');
const router = express.Router();
const sidenavController = require('../controllers/sidenavController');
const middlewareReponse = require('../middleware/response');
const { check, validationResult }
  = require('express-validator');
  const sidenavvalidationresult= [

    check('title'),
    check('iconurl'),
    check('page'),
    check('status'),
    check('sortorder')
                   
  ]


/**
 * @swagger
 * definitions:
 *   sidenav:
 *     properties:
 *       title:
 *         type: string
 *       iconurl:
 *         type: string
 *       sortorder:
 *         type: string
 *       page:
 *         type: string
 *       status:
 *         type: string
 */
//create
router.post('/',  sidenavvalidationresult, sidenavController.create, middlewareReponse.saveResponse);

/**
 * @swagger
 * /api/v1/sidenav:
 *   post:
 *     security:           
 *       - Bearer: []
 *     tags:
 *       - sidenav
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new sidenav
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: iconurl
 *         type: string
 *       - in: formData
 *         name: page
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *         schema:
 *           $ref: '#/definitions/sidenav'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id',  middlewareReponse.verifyToken, sidenavController.updatesidenav, middlewareReponse.updateResponse);
/**
* @swagger
* /api/v1/sidenav/{id}: 
*   put:
*     security:           
*       - Bearer: []
*     tags:
*       - sidenav
*     description: update a new sidenav
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: sidenav id to Update
*         required: true
*         type: string
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: iconurl
 *         type: string
 *       - in: formData
 *         name: page
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
*         schema:
*           $ref: '#/definitions/sidenav'
*     responses:
*       200:
*         description: Successfully created
*/
router.delete('/:id', middlewareReponse.verifyToken, sidenavController.deletesidenav, middlewareReponse.deleteResponse);
/**
* @swagger
* /api/v1/sidenav/{id}: 
*   delete:
*     security:           
*       - Bearer: []
*     tags:
*       - sidenav
*     summary: Deletes a sidenav
*     description: ''
*     operationId: deletesidenav
*     produces:
*       - application/xml
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: sidenav id to delete
*         required: true
*         type: string
*     responses:
*       '400':
*         description: Invalid ID supplied
*       '404':
*         description: sidenav not found   
* 
*/
router.get('/', sidenavController.getsidenav, middlewareReponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/sidenav:
 *   get:
 *     security:           
 *       - Bearer: [] 
 *     tags:
 *       - sidenav
 *     description: Returns all sidenav
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of sidenav       
 *         schema:
 *           $ref: '#/definitions/sidenav'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:slug', sidenavController.getbyslug, middlewareReponse.getByIdResponse);
/**
* @swagger
* /api/v1/sidenav/{slug}: 
*   get:
*     tags:
*       - sidenav
*     description: get a single sidenav
*     produces:
*        - application/json
*     parameters:
*       - name: slug
*         in: path
*         description: slug to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/sidenav' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: sidenav not found
*/
router.get('/id/:id', sidenavController.getsidenavbyid);
/**
* @swagger
* /api/v1/sidenav/id/{id}: 
*   get:
*     tags:
*       - sidenav
*     description: get a single sidenav
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: sidenav id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/sidenav' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: sidenav not found
*/


module.exports = router;