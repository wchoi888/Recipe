import React, { useState, useEffect } from 'react';
import RecipesForm from '../RecipeForm';
import RecipesList from '../RecipesList/RecipesList';
import ExternalRecipes from '../ExternalRecipes/ExternalRecipes';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; //need to import use navigate to nav to search page

const Dashboard = () => {
    const [recipes, setRecipes] = useState(() => {
        // Retrieve recipes from local storage
        const savedRecipes = localStorage.getItem('recipes');
        return savedRecipes ? JSON.parse(savedRecipes) : [];
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for storing the search query

    const navigate = useNavigate(); //hook for navigating

    useEffect(() => {
        // Save recipes to local storage whenever they change
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
        setSelectedRecipe(null);
    };

    const editRecipe = (recipeId, newTitle, newIngredients, newInstructions) => {
        setRecipes(recipes.map(recipe => 
            recipe.id === recipeId ? {...recipe, title: newTitle, ingredients: newIngredients, instructions: newInstructions} : recipe
        ));
        setSelectedRecipe(null);
    };

    const selectRecipeForEdit = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const clearSelection = () => {
        setSelectedRecipe(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        navigate(`/search?query=${searchQuery}`); // navigate to search results page based on query
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
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <div className="HeaderItem">Logout</div>
                </div>
                <RecipesList 
                  recipes={recipes} 
                  selectRecipeForEdit={selectRecipeForEdit} 
                />
                <ExternalRecipes searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default Dashboard;
