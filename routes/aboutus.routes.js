const express = require("express");
const router = express.Router();
const aboutusController = require("../controllers/aboutusController");
const middlewareReponse = require("../middleware/response");
const multer = require("multer");
// const upload = require("../middleware/bannerupload")
const { check, validationResult } = require("express-validator");
// const FileUpload = require("../services/file_upload")

let { upload } = require("../services/file_upload");

const aboutusvalidationresult = [
  check("title", "title length should be 2 to 20 characters").isLength({
    min: 2,
    max: 20,
  }),
  check("description"),
  check("shortdescription"),
  check("sortorder"),
  check("Image"),
];

/**
 * @swagger
 * definitions:
 *   aboutus:
 *     properties:
 *       title:
 *         type: string
 *       shortdescription:
 *         type: string
 *       description:
 *         type: string
 *       ourvision_description:
 *         type: string
 *       ourvalue_description:
 *         type: string
 *       ourvalue_points:
 *         type: string
 *       Image:
 *         type: string
 *       createdby:
 *         type: string
 *       sortorder:
 *         type: string
 *
 */

//create
router.post(
  "/",
  upload("aboutus").single("Image"),
  aboutusvalidationresult,
  middlewareReponse.verifyToken,
  aboutusController.create,
  middlewareReponse.saveResponse
);
/**
 * @swagger
 * /api/v1/aboutus:
 *   post:
 *     security:
 *      - Bearer: []
 *     tags:
 *       - aboutus
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new aboutus
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
 *         name: shortdescription
 *         type: string
 *       - in: formData
 *         name: ourvision_description
 *         type: string
 *       - in: formData
 *         name: ourvalue_description
 *         type: string
 *       - in: formData
 *         name: ourvalue_points
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/aboutus'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put(
  "/:id",
  upload("aboutus").single("Image"),
  middlewareReponse.verifyToken,
  aboutusController.updateaboutus,
  middlewareReponse.updateResponse
);
/**
 * @swagger
 * /api/v1/aboutus/{id}:
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - aboutus
 *     description: Creates a new aboutus
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: aboutus id to Update
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
 *         name: shortdescription
 *         type: string
 *       - in: formData
 *         name: ourvalue_description
 *         type: string
 *       - in: formData
 *         name: ourvalue_points
 *         type: string
 *       - in: formData
 *         name: ourvision_description
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/aboutus'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete(
  "/:id",
  middlewareReponse.verifyToken,
  aboutusController.deleteaboutus,
  middlewareReponse.deleteResponse
);
/**
 * @swagger
 * /api/v1/aboutus/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - aboutus
 *     summary: Deletes a aboutus
 *     description: ''
 *     operationId: deleteaboutus
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: aboutus id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: banner not found
 *
 */
router.get(
  "/",
  aboutusController.getaboutus,
  middlewareReponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/aboutus:
 *   get:
 *     tags:
 *       - aboutus
 *     description: Returns al aboutus
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of aboutus
 *         schema:
 *           $ref: '#/definitions/aboutus'
 *       400:
 *         description: Invalid status value
 */
module.exports = router;
