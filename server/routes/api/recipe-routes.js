const router = require("express").Router();
const {
  createRecipe,
  getallRecipe,
  getSingleRecipe,
  saveRecipe,
  saveCreatedRecipe,
  deleteSavedRecipe,
  deleteRecipe,
} = require("../../controllers/recipe-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createRecipe).get(getallRecipe);
// .put(authMiddleware, saveRecipe);

// router.route("/me").get(authMiddleware, getSingleUser);

// router.route("/recipes/:recipeId").delete(authMiddleware, deleteRecipe);

router
  .route("/recipes/:recipeId")
  .get(getSingleRecipe)
  .delete(deleteRecipe)
  .delete(deleteSavedRecipe);

module.exports = router;
