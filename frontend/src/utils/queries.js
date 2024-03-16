//this is just a placeholder until wing has tested his resolvers and ppastes the operations here
import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
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

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
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

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      createdRecipes {
        _id
        title
        ingredients
        instructions
      }
    }
  }
`;
