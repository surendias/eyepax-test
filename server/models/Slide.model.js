const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let slideSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
  },
  {
    collection: "slides",
  }
);

module.exports = mongoose.model("Slide", slideSchema);
