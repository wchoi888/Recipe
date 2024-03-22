//this is just a placeholder until wing has tested his resolvers and ppastes the operations here
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(_id: $userId) {
      _id
      username
      email
      createdRecipes{
        _id
      recipeName
      ingredients
      instructions
      category
      }
      savedRecipes{
        _id
      recipeName
      ingredients
      instructions
      category
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      createdRecipes{
        _id
      recipeName
      ingredients
      instructions
      category
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query recipes {
    recipes {
      _id
      recipeName
      ingredients
      instructions
      category
    }
  }
`;


export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeName
      ingredients
      instructions
      category
    }
  }
`;

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      _id
      categoryName
      categoryDesc
    }
  }
`;