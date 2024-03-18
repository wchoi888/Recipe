const { Schema, model } = require("mongoose");
const IngredientsSchema = require("./Ingredient");

const recipeSchema = new Schema({
  recipeName:
    {
      type: String,
      required: true,
    },
  recipeDesc: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },

  ingredients: [IngredientsSchema],

  image: {
    type: String,
  },
  category: {
    type: String,
    ref: "Category",
    required: false,
  },
});
const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
