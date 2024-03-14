const { Schema } = require("mongoose");
const IngredientsSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});
module.exports = IngredientsSchema;
