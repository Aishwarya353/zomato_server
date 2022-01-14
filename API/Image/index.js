//library

import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Database model
import { ImageModel } from "../../database/allmodels";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

//utility function
import { s3Uploads } from "../../utils/s3";

/**
 * Route        /
 * Des          Uploads given image to s3 bucket and saves file link to mongodb
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/", upload.single("file"), async (req, res) => {
  //above is to upload single image
  //below is to upload multiple images
  //4 is the max size
  //Router.post("/", upload.array("file", 4), async (req, res) => {
  try {
    const file = req.file;

    //s3 bucket options
    const bucketOptions = {
      Bucket: "zomato-master",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
      //ACL=Access Control List
    };

    const uploadImage = await s3Upload(bucketOptions);

    const saveImageToDatabase = await ImageModel.create({
      images: [{ location: uploadImage.Location }],
    });

    return res.status(200).json(saveImageToDatabase);

    //  return res.status(200).json({uploadImage});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await ImageModel.findById(_id);

    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;
