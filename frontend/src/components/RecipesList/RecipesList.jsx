import React from 'react';
import './RecipesList.css'; 

const RecipesList = ({ recipes, selectRecipeForEdit }) => {
  return (
    <div className="RecipesListContainer">
      <h2>Your Recipes</h2>
      <ul className="RecipesList">
        {recipes.map((recipe) => (
          <li className="RecipeItem" key={recipe.id} onClick={() => selectRecipeForEdit(recipe)}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
