import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $title: String!
    $instructions: String!
    $ingredients: String!
    $category: ID!
  ) {
    addRecipe(
      recipeName: $title
      instructions: $instructions
      ingredients: $ingredients
      category: $category
    ) {
      _id
      recipeName
      instructions
      ingredients
      category
    }
  }
`;

export const EDIT_RECIPE = gql`
  mutation editRecipe(
    $recipeId: ID!
    $title: String
    $instructions: String
    $ingredients: String
    $category: ID
  ) {
    editRecipe(
      recipeId: $recipeId
      recipeName: $title
      instructions: $instructions
      ingredients: $ingredients
      category: $category
    ) {
      _id
      recipeName
      instructions
      ingredients
      category
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($recipeId: ID!) {
    deleteRecipe(recipeId: $recipeId) {
      _id
    }
  }
`;
export const SAVE_EXTERNAL_RECIPE = gql`
  mutation saveExternalRecipe(
    $recipeName: String!
    $details: String!
    $image: String
    $externalId: String
  ) {
    saveExternalRecipe(
      recipeName: $recipeName
      instructions: $details
      image: $image
      externalId: $externalId
    ) {
      _id
      recipeName
      instructions
      image
      externalId
    }
  }
`;
