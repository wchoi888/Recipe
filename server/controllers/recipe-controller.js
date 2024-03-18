// import user model
const User = require("../models/User");
const Recipe = require("../models/Recipe");
// import sign token function from auth
const { signToken } = require("../utils/auth_old");

module.exports = {
  // get a single user by either their id or their username
  async getallRecipe({ user = null, params }, res) {
    // const users = await User.findAll();
    const recipes = await Recipe.find();

    if (!recipes) {
      return res.status(400).json({ message: "Cannot find recipes" });
    }

    res.json(recipes);
  },

  async getSingleRecipe({ user = null, params }, res) {
    const foundRecipe = await Recipe.findOne({
      $or: [{ _id: recipe ? recipe._id : params.id }],
    });

    if (!foundRecipe) {
      return res
        .status(400)
        .json({ message: "Cannot find a recipe with this id!" });
    }

    res.json(foundRecipe);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  //
  async createRecipe(req, res) {
    const recipe = await Recipe.create(req.body);

    if (!recipe) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    // const token = signToken(user);
    // res.json({ token, user });
    res.json(recipe);
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body

  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveCreatedRecipe({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { createdRecipe: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async saveRecipe({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedRecipe: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a book from `savedBooks`
  async deleteRecipe({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { createdRecipe: { recipeId: params.recipeId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with this id!" });
    }
    await Recipe.deleteOne(params.recipeId);
    return res.json(updatedUser);
  },
  async deleteSavedRecipe({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedRecipe: { recipeId: params.recipeId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find recipe with this id!" });
    }
    return res.json(updatedUser);
  },
};
