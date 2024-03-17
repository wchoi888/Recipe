//this is just a placeholder until wing has tested his resolvers and ppastes the operations here
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($title: String!, $ingredients: String!, $instructions: String!) {
    createRecipe(recipeInput: {title: $title, ingredients: $ingredients, instructions: $instructions}) {
      _id
      title
      ingredients
      instructions
      creator {
        _id
        username
      }
    }
  }
`;

export const EDIT_RECIPE = gql`
  mutation editRecipe($recipeId: ID!, $title: String, $ingredients: String, $instructions: String) {
    editRecipe(editRecipeInput: {recipeId: $recipeId, title: $title, ingredients: $ingredients, instructions: $instructions}) {
      _id
      title
      ingredients
      instructions
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
