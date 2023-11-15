const express = require("express");
const router = express.Router();
const newsandblogsController = require("../controllers/newsandblogsController");
const middlewareResponse = require("../middleware/response");
let { upload } = require("../services/file_upload");
const { check, validationResult } = require("express-validator");

// const newsandblogsvalidationresult = [
//   check("title"),
//   check("content"),
//   check("status"),
//   check("publisher"),
// ];

/**
 * @swagger
 * definitions:
 *   newsandblogs:
 *     properties:
 *       title:
 *         type: string
 *         description: The title of the news or blog post.
 *       description:
 *         type: string
 *         description: The description or content of the news or blog post.
 *       images:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *               description: The image data or URL.
 *             contentType:
 *               type: string
 *               description: The content type of the image.
 *         description: An array of gallery items (e.g., image URLs).
 *       createddate:
 *         type: string
 *         format: date
 *         description: The date when the news or blog post was created.
 *       updateddate:
 *         type: string
 *         format: date
 *         description: The date when the news or blog post was last updated.
 *       createdby:
 *         type: string
 *         description: The name of the creator or author of the news or blog post.
 *       sortorder: 
 *         type: string
 *       status:
 *         type: integer
 *         description: The status of the news or blog post (e.g., 0 for unpublished, 1 for published).
 *       published_date:
 *         type: string
 *         format: date
 *         description: The date when the news or blog post was published.
 *       unpublished_date:
 *         type: string
 *         format: date
 *         description: The date when the news or blog post was unpublished or removed from publication.
 *       publisher:
 *         type: string
 *         description: The name of the publisher or entity responsible for publishing the news or blog post.
 *       seo_metadata:
 *         type: string
 *         description: SEO metadata, including meta tags and descriptions.
 *       seotitle:
 *         type: string
 *         description: The SEO title for the news or blog post.
 */
//create
router.post(
  "/",
  upload("newsandblogs").array("images", 10),
  middlewareResponse.verifyToken,
  newsandblogsController.create,
  middlewareResponse.saveResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - newsandblogs
 *     summary: Uploads a file and creates a new news or blog post.
 *     consumes:
 *       - multipart/form-data
 *     description: Create a new news or blog post with an image and associated data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: array
 *         items:
 *           type: file
 *         description: Array of images to be associated with the news or blog post.
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: published_date
 *         type: string
 *       - in: formData
 *         name: unpublished_date
 *         type: string
 *       - in: formData
 *         name: publisher
 *         type: string
 *       - in: formData
 *         name: seo_metadata
 *         type: string
 *       - in: formData
 *         name: status
 *         type: number
 *       - in: formData
 *         name: userId
 *         type: string
 *       - in: formData
 *         name: newsandblogs
 *         $ref: '#/definitions/newsandblogs'
 *     responses:
 *       200:
 *         description: Successfully created.
 */
//update
router.put(
  "/:id",
  upload("newsandblogs").array("images",10),
  middlewareResponse.verifyToken,
  newsandblogsController.updatenewsandblogs,
  middlewareResponse.updateResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/{id}:
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - newsandblogs
 *     summary: Uploads a file and update a news or blog post.
 *     consumes:
 *       - multipart/form-data
 *     description: update a new news or blog post with an image and associated data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: newsandblogsform id to Update
 *         required: true
 *       - in: formData
 *         name: images
 *         type: array
 *         items:
 *           type: file
 *         description: Array of images to be associated with the news or blog post.
 *       - in: formData
 *         name: title
 *         type: string
 *       - in: formData
 *         name: sortorder
 *         type: string
 *       - in: formData
 *         name: seotitle
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: published_date
 *         type: string
 *       - in: formData
 *         name: unpublished_date
 *         type: string
 *       - in: formData
 *         name: publisher
 *         type: string
 *       - in: formData
 *         name: seo_metadata
 *         type: string
 *       - in: formData
 *         name: status
 *         type: number
 *       - in: formData
 *         name: userId
 *         type: string
 *       - in: formData
 *         name: newsandblogs
 *         $ref: '#/definitions/newsandblogs'
 *     responses:
 *       200:
 *         description: Successfully created.
 */
router.delete(
  "/:id",
  middlewareResponse.verifyToken,
  newsandblogsController.deletenewsandblogs,
  middlewareResponse.deleteResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - newsandblogs
 *     summary: Deletes a newsandblogs
 *     description: ''
 *     operationId: deletenewsandblogs
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: newsandblogs id to delete
 *         required: true
 *         type: string
 *     responses:
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: newsandblogs not found
 *
 */
router.get(
  "/",
  newsandblogsController.getnewsandblogs,
  middlewareResponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - newsandblogs
 *     description: Returns all newsandblogs
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of newsandblogs
 *         schema:
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *         description: Invalid status value
 */
router.delete("/:postId/images/:imageId",newsandblogsController.deleteImage)
/**
 * @swagger
 * /api/v1/newsandblogs/{postId}/images/{imageId}:
 *   delete:
 *     tags:
 *       - newsandblogs
 *     summary: Deletes a news and blogs image
 *     description: Delete a specific image associated with a news or blog post
 *     operationId: deleteNewsAndBlogsImage
 *     produces:
 *       - application/xml
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: News and blogs post ID
 *         required: true
 *         type: string
 *       - name: imageId
 *         in: path
 *         description: Image ID to delete
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Image removed successfully
 *       '400':
 *         description: Invalid request or ID supplied
 *       '404':
 *         description: News and blogs or image not found
 */





router.get("/:id", newsandblogsController.getnewsandblogsbyid);
/**
 * @swagger
 * /api/v1/newsandblogs/{id}:
 *   get:
 *     tags:
 *       - newsandblogs
 *     description: get a single newsandblogs
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: newsandblogs id to view
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *         description: newsandblogs not found
 */
router.get(
  "/newsblog/status",
  newsandblogsController.getnewsandblogsstatus,
  middlewareResponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/newsblog/status:
 *   get:
 *     tags:
 *       - newsandblogs
 *     description: Returns status newsandblogs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         type: number
 *         description: "Page number for pagination"
 *         required: false
 *     responses:
 *       200:
 *         description: An array of newsandblogs
 *         schema:
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *         description: Invalid status value
 */

router.get(
  "/recent/recentblogs",
  newsandblogsController.getrecentnewsandblogs,
  middlewareResponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/recent/recentblogs:
 *   get:
 *     tags:
 *       - newsandblogs
 *     description: Returns all newsandblogs
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of recent newsandblogs
 *         schema:
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *         description: Invalid status value
 */
router.get(
  "/archive/count",
  newsandblogsController.getarchievecount,
  middlewareResponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/archive/count:
 *   get:
 *     tags:
 *       - newsandblogs
 *     description: Returns all newsandblogs
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: An array of recent newsandblogs
 *         schema:
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *         description: Invalid status value
 */
router.get(
  "/slug/:slug",
  newsandblogsController.getbyslug,
  middlewareResponse.getByIdResponse
);
/**
 * @swagger
 * /api/v1/newsandblogs/slug/{slug}:
 *   get:
 *     tags:
 *       - newsandblogs
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
 *           $ref: '#/definitions/newsandblogs'
 *       400:
 *          description: Invalid ID supplied
 *       404:
 *         description: newsandblogs not found
 */




module.exports = router;
