const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeDesc: {
    type: String,
  },
  instructions: {
    type: String,
    required: true,
  },

  ingredients: {
    type: String,
    required: false,
  },

  image: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  externalId: {
    //create separate ID for recipes from External API
    type: String,
    required: false,
  },
});
const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
