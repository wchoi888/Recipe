const router = require("express").Router();
const {
  createUser,
  getallUser,
  getSingleUser,
  login,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth_old");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser).get(getallUser);
// .put(authMiddleware, saveRecipe);
// .put(authMiddleware, saveRecipe);

router.route("/login").post(login);

// router.route("/me").get(getSingleUser);

router.route("/me").get(authMiddleware, getSingleUser);

// router.route("/recipes/:recipeId").delete(authMiddleware, deleteRecipe);

// router.route("/recipes/:recipeId").delete(deleteRecipe);

module.exports = router;
