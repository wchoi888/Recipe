const { User, Recipe, Category, Ingredient } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
//const { AuthenticationError } = require('apollo-server-errors');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('createdRecipes');
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate('createdRecipes');
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
      console.log(context.user)
      if (context.user) {
        const userData= await User.findOne({ _id: context.user._id }).populate("createdRecipes");
        console.log(userData)
        return userData
      }
      throw  AuthenticationError;
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
    addCategory: async (parent, { categoryName, categoryDesc }) => {
      const category = await Category.create({ categoryName, categoryDesc });
      return category;
    },
    addRecipe: async (
      parent,
      { recipeName, instructions, ingredients, category },
      context
    ) => {
      try {
        if (!context.user) {
          throw AuthenticationError;
        }
      if (context.user) {
        const recipe = await Recipe.create({
          recipeName,
          instructions,
          ingredients,
          category,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { createdRecipes: recipe._id } }
        );

        return recipe;
      }
      } catch (error) {
        console.log('Error adding recipe:', error);
        throw new Error('An error occurred while adding the recipe. Please try again.');
      }
    },
    editRecipe: async (
      parent,
      { recipeId, recipeName, instructions, ingredients, category },
      context
    ) => {
      try {
        if (!context.user) {
          throw  AuthenticationError;
        }
    
        const recipe = await Recipe.findById(recipeId);
      
        if (!recipe) {
          throw new Error('Recipe not found.');
        }
    
        recipe.recipeName = recipeName || recipe.recipeName;
        recipe.instructions = instructions || recipe.instructions;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.category = category || recipe.category;
      
        const updatedRecipe = await recipe.save();
        return updatedRecipe;
      } catch (error) {
        console.error('Error editing recipe:', error);
        throw new Error('An error occurred while editing the recipe. Please try again.');
      }
    },

    deleteRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { createdRecipes: recipeId } }
        );
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
        });
        return recipe;
      }
    },
    saveExternalRecipe: async (parent, { recipeName, details, image, externalId }, context) => {
      if (!context.user) { // user needs to be authenticated in order to save recipe from API
        throw new AuthenticationError;
      }
      
      const savedRecipe = await Recipe.create({
        recipeName,
        details,
        image,
        externalId
        // I did not include 'category' here because it's from the external API.
      });
      await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedRecipes: savedRecipe._id } });

      return savedRecipe;// update the user's list of saved recipes
    },
  },
  

};

module.exports = resolvers;
