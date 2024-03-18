const { User, Recipe, Category, Ingredient } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    recipes: async () => {
      return Recipe.find().sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
    categories: async () => {
      return Category.find().sort({ createdAt: -1 });
    },
    category: async (parent, { categoryId }) => {
      return Category.findOne({ _id: categoryId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (
      parent,
      { recipeName, recipeDesc, instructions, ingredients, categoryId, image },
      context
    ) => {
      if (context.user) {
        const recipe = await Recipe.create({
          recipeName,
          recipeDesc,
          instructions,
          ingredients,
          categoryId,
          image,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { createdRecipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
