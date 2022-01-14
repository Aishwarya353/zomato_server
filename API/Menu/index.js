//libraries
import express from "express";

//Database model
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route        /list
 * Des          Get all the list of menu based on restaurant id
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await MenuModel.findById(_id);

    if (!menus) {
      return res
        .status(404)
        .json({ error: "No menu present for this restaurant" });
    }
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /image
 * Des          Get all the list of menu images with restaurant id
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menuImages = await ImageModel.findOne(_id);

    //TODO: validate if the images are present or not,throw error if not present
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
export default Router;
