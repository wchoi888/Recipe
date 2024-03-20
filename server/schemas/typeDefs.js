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
    ingredients: String
    category: ID
    image: String
  }
  type Category {
    _id: ID
    categoryName: String
    categoryDesc: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    categories: [Category]
    category(categoryId: ID!): Category
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCategory(categoryName: String!, categoryDesc: String): Category
    addRecipe(recipeName: String!, instructions: String!, ingredients: String!, category: ID!): Recipe
    editRecipe(recipeId: ID!, recipeName: String, instructions: String, ingredients: String, category: ID): Recipe
    deleteRecipe(recipeId: ID!): Recipe
 
  }
`;

module.exports = typeDefs;