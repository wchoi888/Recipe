const { Schema, model } = require("mongoose");
const IngredientsSchema = require("./Ingredients");
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const recipeSchema = new Schema({
  name: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
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
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
