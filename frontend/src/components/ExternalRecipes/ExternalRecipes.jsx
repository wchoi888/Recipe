//this is where users will be able to see the results from the external API. they will need to navigate to '/recipes'
//need to add a search button that 'onclik' navigates to results page..?
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ExternalRecipes = () => {//define component to handle search queries
    const [recipes, setRecipes] = useState([]);//create state to store recipes...
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const location = useLocation();

    const fetchRecipes = (query) => { //functin to fetch recipes
        // if(searchQuery) {//search query is require to make fetch
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)//query based on keyword
                .then(response => response.json())
                .then(data => setRecipes(data.meals))
                .catch(err => console.error(err));
        
    };

    const handleRecipeSelect = (recipe) => {
        setSelectedRecipe(recipe);
    };

    //show recipe details in new section
    const renderRecipeDetails = () => {
        return selectedRecipe && (
            <div>
                <h2>{selectedRecipe.strMeal}</h2>
                <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            </div>
        );
    };

    useEffect(() => { //useEffect hook to make side effects in the component
        const params = new URLSearchParams(location.search);//get search query from url 
        const query = params.get('query');
        if (query) {
            fetchRecipes(query);
        }
    }, [location.search]);

    return (
        <div>
            <div>
                {recipes && recipes.map((recipe, index) => (
                    <div key={index} onClick={() => handleRecipeSelect(recipe)}>
                        <h3>{recipe.strMeal}</h3>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    </div>
                ))}
            </div>
            {renderRecipeDetails()}
        </div>
    );
};

export default ExternalRecipes;
