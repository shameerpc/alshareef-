const resetpasswordController=require("../controllers/resetpasswordController")
const express=require("express");
const middlewareReponse = require('../middleware/response');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   resetpassword:
 *     properties:
 *       newPassword:
 *         type: string
 *       
 *        
 */

router.post('/:token', resetpasswordController.resetPassword, middlewareReponse.saveResponse);


/**
 * @swagger
 * /api/v1/resetpassword/{token}:
 *   post:
 *     tags:
 *       - resetpassword
 *     summary: Reset user password
 *     description: Reset the password for a user using the provided reset token.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: token to Update
 *         required: true
 *         type: string
 *       - in: formData
 *         name: newPassword
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Password reset successful. You can now login with your new password.
 *       400:
 *         description: Invalid or expired token. Please request a new password reset.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 */



module.exports=router;