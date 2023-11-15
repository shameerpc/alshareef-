
const express = require('express');
const router = express.Router();
const careersformController = require('../controllers/careersformController');
const middlewareResponse = require('../middleware/response');
let upload = require('../services/cv');
const { check, validationResult }
  = require('express-validator');


  const careerformvalidationresult= [
    check('Youremail', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('Fullname', 'Name length should be 2 to 20 characters')
                    .isLength({ min: 2, max: 20 }),
    check('Contactno', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
    check('jobtitle')
                   
]
/**
 * @swagger
 * definitions:
 *   careersform:
 *     properties:
 *       Fullname:
 *         type: string
 *       Youremail:
 *         type: string
 *       Contactno:
 *         type: string
 *       Jobtitle:
 *         type: string
 *       Uploadyourcv:
 *         type: string
 *       
 *        
 */
//create
router.post('/', upload.single('Uploadyourcv'),careerformvalidationresult, careersformController.create, middlewareResponse.saveResponse);
/**
 * @swagger
 * /api/v1/careersform:
 *   post:
 *     tags:
 *       - careersform
 *     description: Creates a new careersform
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: Uploadyourcv
 *         type: file
 *         description: The file to upload
 *       - in: formData
 *         name: Fullname
 *         type: string
 *       - in: formData
 *         name: Youremail
 *         type: string
 *       - in: formData
 *         name: Jobtitle
 *         type: string
 *       - in: formData
 *         name: Contactno
 *         type: number
 *         schema:
 *           $ref: '#/definitions/careersform'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put('/:id', upload.single('Uploadyourcv'), careersformController.updatecareersform, middlewareResponse.updateResponse);
/**
* @swagger
* /api/v1/careersform/{id}: 
*   put:
*     tags:
*       - careersform
*     description: Creates a new careersform
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         description: careersform id to Update
*         required: true
*       - in: formData
*         name: Uploadyourcv
*         type: file
*         description: The file to upload
*       - in: formData
*         name: Fullname
*         type: string
*       - in: formData
*         name: Youremail
*         type: string
*       - in: formData
*         name: Jobtitle
*         type: string
*       - in: formData
*         name: Contactno
*         type: number
*         schema:
*           $ref: '#/definitions/careersform'
*     responses:
*       200:
*         description: Successfully created
*/
router.get('/', careersformController.getcareersform, middlewareResponse.getByIdResponse);
/**
 * @swagger
 * /api/v1/careersform:
 *   get:
 *     tags:
 *       - careersform
 *     description: Returns all contactusform
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of careersform       
 *         schema:
 *           $ref: '#/definitions/careersform'
 *       400:
 *         description: Invalid status value 
 */
router.get('/:id', careersformController.getcareersformbyid);
/**
* @swagger
* /api/v1/careersform/{id}: 
*   get:
*     tags:
*       - careersform
*     description: get a single careersform
*     produces:
*        - application/json
*     parameters:
*       - name: id
*         in: path
*         description: careersform id to view
*         required: true
*         type: string
*     responses:
*       200:
*         description: successful operation
*         schema:
*           $ref: '#/definitions/careersform' 
*       400:
*          description: Invalid ID supplied
*       404:
*         description: careersform not found
*/

module.exports = router;