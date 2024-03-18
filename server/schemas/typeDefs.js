const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdRecipes: [Recipe]
    savedRecipes: [Recipe]
  }
  type Recipe {
    _id: ID
    recipeName: String
    recipeDesc: String
    instructions: String
    ingredients: [Ingredient]
    categoryId: Category
    image: String
  }
  type Category {
    _id: ID
    categoryName: String
    categoryDesc: String
  }
  type Ingredient {
    _id: ID
    ingredientName: String
    quantity: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    categories: [Category]
    category(categoryId: ID!): Category
    ingredients(recipeId: ID!): [Ingredient]
    ingredient(ingredientName: String!): Ingredient
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(name: String!, recipeDesc: String!, instructions: String!, ingredients: String!,    categoryId: ID!, image: String): Recipe
 
  }
`;

module.exports = typeDefs;