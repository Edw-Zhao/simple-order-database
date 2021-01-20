const express = require("express");
const app = express();

const orderRoute = express.Router();
let Order = require("../model/Order");

// Add Order
orderRoute.route("/add-order").post((req, res, next) => {
  Order.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all Order
orderRoute.route("/").get((req, res) => {
  Order.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Order
orderRoute.route("/read-order/:id").get((req, res) => {
  Order.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Order
orderRoute.route("/update-order/:id").put((req, res, next) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("order updated successfully!");
      }
    }
  );
});

// Delete Order
orderRoute.route("/delete-order/:id").delete((req, res, next) => {
  Order.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = orderRoute;
