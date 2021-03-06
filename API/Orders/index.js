//libraries
import express from "express";

//for validation for private routes
import passport from "passport";

//Database Model
import { OrderModel } from "../../database/allmodels";

//ValidateUser
import ValidateUser from "../../config/validateUser";

const Router = express.Router();

/**
 * Route        /
 * Des          Get all the orders based on id
 * Params       _id
 * Access       Private
 * Method       GET
 */
//Router.get("/:_id",middleware executed before response, async (req, res) => {
Router.get("/:_id", passport.authenticate("jwt"), async (req, res) => {
  try {
    await ValidateUser(req, res);
    const { _id } = req.params;

    const getOrders = await OrderModel.findOne({ user: _id });
    if (!getOrders) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json({ orders: getOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /new/:_id
 * Des          Add new order
 * Params       _id
 * Access       Private
 * Method       POST
 */

Router.post("/new/:_id", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.params;
    const { orderDetails } = req.body;

    const addNewOrder = await OrderModel.findOneAndUpdate(
      {
        user: _id,
      }, //to find
      {
        $push: { orderDetails: orderDetails },
      },
      //to update
      {
        new: true,
      } //mandatory field (bcz new is false by default)
    );

    return res.json({ order: addNewOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;
