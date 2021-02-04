const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema(
  {
    table: {
      type: String,
    },
    seat: {
      type: String,
    },
    appetizer: {
      type: String,
    },
    drink: {
      type: String,
    },
    mainCourse: {
      type: String,
    },
    urgency: {
      type: Boolean,
    },
    notes: {
      type: String,
    },
    served: {
      type: Boolean,
    },
    payed: {
      type: Boolean,
    },
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", Order);
