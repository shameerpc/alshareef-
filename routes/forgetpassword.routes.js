const forgetpasswordController=require("../controllers/forgetpasswordController")
const express=require("express");
const middlewareReponse = require('../middleware/response');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   forgetpassword:
 *     properties:
 *       email:
 *         type: string
 *       
 *        
 */

router.post('/',  forgetpasswordController.forgetPassword,middlewareReponse.saveResponse);

/**
 * @swagger
 * /api/v1/forgetpassword:
 *   post:
 *     tags:
 *       - forgetpassword
 *     description: Creates a new forgetpassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully created
 */



module.exports=router;
