const { Schema } = require("mongoose");
const IngredientsSchema = new Schema({
  ingredientName: { type: String, required: true },
  quantity: { type: String, required: true },
});
module.exports = IngredientsSchema;
