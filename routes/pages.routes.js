const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const middlewareReponse = require("../middleware/response");
const multer = require("multer");
let { upload } = require("../services/file_upload");
const { check, validationResult } = require("express-validator");

// const pagesvalidationresult = [
//   check("title"),
//   check("description"),
//   check("sortorder"),
//   check("Image"),
//   check("status"),
//   check("gallery"),
//   check("pages"),
//   check("seotitle"),
//   check("seo_metadata"),
// ];

/**
 * @swagger
 * definitions:
 *   pages:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       Image:
 *         type: string
 *       status:
 *         type: Boolean
 *       pages:
 *         type: array
 *       gallery:
 *         type: array
 *       address:
 *         type: string
 *       phonenumber:
 *         type: number
 *       email:
 *         type: string
 *       youtube:
 *         type: string
 *       twitter:
 *         type: string
 *       facebooklink:
 *         type: string
 *       instalink:
 *         type: string
 *       linkedinlink:
 *         type: string
 *       mapembedurl:
 *         type: string
 *       seotitle:
 *         type: string
 *       seo_metadata:
 *         type: string
 */
//create
router.post(
  "/",
  upload("pages").single("Image"),
  middlewareReponse.verifyToken,
  pagesController.create,
  middlewareReponse.saveResponse
);

/**
 * @swagger
 * /api/v1/pages:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - pages
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     description: Creates a new pages
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
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: seo_metadata
 *         type: string
 *       - in: formData
 *         name: gallery
 *         type: array
 *       - in: formData
 *         name: pages
 *         type: array
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: address
 *         type: string
 *       - in: formData
 *         name: phonenumber
 *         type: number
 *       - in: formData
 *         name: email
 *         type: string
 *       - in: formData
 *         name: youtube
 *         type: string
 *       - in: formData
 *         name: twitter
 *         type: string
 *       - in: formData
 *         name: facebooklink
 *         type: string
 *       - in: formData
 *         name: instalink
 *         type: string
 *       - in: formData
 *         name: linkedinlink
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/pages'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//update
router.put(
  "/:id",
  upload("pages").single("Image"),
  middlewareReponse.verifyToken,
  pagesController.updatepage,
  middlewareReponse.updateResponse
);
/**
 * @swagger
 * /api/v1/pages/{id}:
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - pages
 *     description: update a new pages
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: pages id to Update
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
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: seo_metadata
 *         type: string
 *       - in: formData
 *         name: gallery
 *         type: array
 *       - in: formData
 *         name: pages
 *         type: array
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: address
 *         type: string
 *       - in: formData
 *         name: phonenumber
 *         type: number
 *       - in: formData
 *         name: email
 *         type: string
 *       - in: formData
 *         name: youtube
 *         type: string
 *       - in: formData
 *         name: twitter
 *         type: string
 *       - in: formData
 *         name: facebooklink
 *         type: string
 *       - in: formData
 *         name: instalink
 *         type: string
 *       - in: formData
 *         name: linkedinlink
 *         type: string
 *       - in: formData
 *         name: status
 *         type: string
 *       - in: formData
 *         name: userId
 *         type: string
 *         schema:
 *           $ref: '#/definitions/pages'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.delete(
  "/:id",
  middlewareReponse.verifyToken,
  pagesController.deletepage,
  middlewareReponse.deleteResponse
);
/**
 * @swagger
 * /api/v1/pages/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - pages
 *     summary: Deletes a page
 *     description: ''
 *     operationId: deletepages
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: page id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: page not found
 *
 */
router.get(
  "/",
  middlewareReponse.verifyToken,
  pagesController.getpage,
  middlewareReponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/pages:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - pages
 *     description: Returns all pages
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of pages
 *         schema:
 *           $ref: '#/definitions/pages'
 *       400:
 *         description: Invalid status value
 */
router.get(
  "/:slug",
  pagesController.getbyslug,
  middlewareReponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/pages/{slug}:
 *   get:
 *     tags:
 *       - pages
 *     description: get a single slug
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
 *           $ref: '#/definitions/pages'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *         description: page not found
 */
router.get("/id/:id", pagesController.getpagebyid);
/**
 * @swagger
 * /api/v1/pages/id/{id}:
 *   get:
 *     tags:
 *       - pages
 *     description: get a single page
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: page id to view
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: '#/definitions/pages'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *         description: pages not found
 */
router.get(
  "/page/status/",
  pagesController.getpagesstatus,
  middlewareReponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/pages/page/status/:
 *   get:
 *     tags:
 *       - pages
 *     description: Returns status pages
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of pages
 *         schema:
 *           $ref: '#/definitions/pages'
 *       400:
 *         description: Invalid status value
 */

router.post(
  "/upload/image",
  upload("pages").single("Image"),
  middlewareReponse.verifyToken,
  pagesController.uploadFile,
  middlewareReponse.getByIdResponse
);

module.exports = router;
