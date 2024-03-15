import React, { useState, useEffect } from 'react';
import RecipesForm from '../RecipeForm';
import RecipesList from '../RecipesList';
import './Dashboard.css';

const Dashboard = () => {
    const [recipes, setRecipes] = useState(() => {
      // get recipes from local storage
      const savedRecipes = localStorage.getItem('recipes');
      return savedRecipes ? JSON.parse(savedRecipes) : [];
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe for editing

    useEffect(() => {
        // save recipes to local storage when they change
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);

    const addRecipe = (title, ingredients, instructions) => {
        const newRecipe = {
            id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1,
            title,
            ingredients,
            instructions,
        };
        setRecipes([...recipes, newRecipe]);
    };

    const deleteRecipe = (recipeId) => {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        setSelectedRecipe(null); // Clear the selection when a recipe is deleted
    };

    const editRecipe = (recipeId, newTitle, newIngredients, newInstructions) => {
        setRecipes(recipes.map(recipe => 
            recipe.id === recipeId ? {...recipe, title: newTitle, ingredients: newIngredients, instructions: newInstructions} : recipe
        ));
        setSelectedRecipe(null); // Clear the selection after editing is done
    };

    const selectRecipeForEdit = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe for editing
    };

    const clearSelection = () => {
        setSelectedRecipe(null); // Clear the selected recipe
    };

    return (
        <div className="GridContainer">
            <div className="NavContainer">
                <RecipesForm 
                  addRecipe={addRecipe} 
                  deleteRecipe={deleteRecipe} 
                  editRecipe={editRecipe}
                  selectedRecipe={selectedRecipe}
                  clearSelection={clearSelection}
                />
            </div>
            <div className="MainContainer">
                <div className="HeaderContainer">
                    <div className="HeaderItem">Logout</div>
                </div>
                <RecipesList 
                  recipes={recipes} 
                  selectRecipeForEdit={selectRecipeForEdit} // Pass this function to the list component
                />
            </div>
        </div>
    );
};

export default Dashboard;
