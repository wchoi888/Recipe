//schema.js
const { User, Recipe, Category, Ingredient } = require("../models");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }),
});

const RecipeType = new GraphQLObjectType({
    name: "Recipe",
    fields: () => ({
      id: { type: GraphQLID },
      description: { type: GraphQLString },
      instructions: { type: GraphQLString },
      ingredients: { type: new GraphQLList(IngredientType) },
      image: { type: GraphQLString },
      userId: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.userId);
        },
        savedBy: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
              return User.find({ _id: { $in: parent.savedBy } });
            },
          },
      }
    }),
  });
  const IngredientType = new GraphQLObjectType({
    name: "Ingredient",
    fields: () => ({
      name: { type: GraphQLString },
      quantity: { type: GraphQLString },
    }),
  });

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args) {
        return Recipe.find();
      },
    },
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Recipe.findById(args.id);
      },
    },
    categories: {
        type: new GraphQLList(CategoryType),
        resolve(parent, args) {
          return Category.find();
        },
      },
      category: {
        type: CategoryType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Category.findById(args.id);
        },
      },
      ingredients: {
        type: new GraphQLList(IngredientType),
        resolve(parent, args) {
          return Ingredient.find();
        }
    },
    ingredient: {
        type: IngredientType,
        args: { name: { type: GraphQLString } },
        resolve(parent, args) {
          return Ingredient.findOne({ name: args.name });
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
