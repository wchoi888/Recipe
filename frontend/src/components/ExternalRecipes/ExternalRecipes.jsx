//this is where users will be able to see the results from the external API. they will need to navigate to '/recipes'
//need to add a search button that 'onclik' navigates to results page..?
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ExternalRecipes = () => {//define component to handle search queries
    const [recipes, setRecipes] = useState([]);//create state to store recipes...
    const [mealDetails, setMealDetails] = useState({}); //storing meal details as an object
    const location = useLocation();

    const fetchRecipes = (query) => { //functin to fetch recipes
        // if(searchQuery) {//search query is require to make fetch
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)//query based on keyword
            .then(response => response.json())
            .then(data => setRecipes(data.meals))
            .catch(err => console.error(err));    
    };

    const fetchMealDetails = (mealId) => { //function to get meal detials (ingredients, instructions)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                setMealDetails(prevDetails => ({
                    ...prevDetails,
                    [mealId]: data.meals[0] // Store meal details using mealId as key
                }));
            }) 
            .catch(err => console.error(err));
    };

    const handleRecipeSelect = (recipe) => {
        fetchMealDetails(recipe.idMeal);
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
            {recipes && recipes.map((recipe, index) => (
                <div key={index}>
                    <h3 onClick={() => handleRecipeSelect(recipe)}>{recipe.strMeal}</h3>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} onClick={() => handleRecipeSelect(recipe)} />
                    {mealDetails[recipe.idMeal] && ( // Check if details for this mealId exist
                        <div>
                            <p>Instructions: {mealDetails[recipe.idMeal].strInstructions}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ExternalRecipes;
