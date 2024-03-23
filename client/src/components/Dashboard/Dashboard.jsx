import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import RecipesForm from '../RecipeForm';
import RecipesList from '../RecipesList/RecipesList';
import ExternalRecipes from '../ExternalRecipes/ExternalRecipes';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; //need to import use navigate to nav to search page
import Auth from '../../utils/auth'
import {  QUERY_USER} from '../../utils/queries';

const Dashboard = () => {
    const user = Auth.loggedIn() ? Auth.getUser() : null;
    const navigate = useNavigate(); //hook for navigating
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { userId: user ? user.data._id : null }
    });

    

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for storing the search query


    useEffect(() => {
       if(!Auth.loggedIn()){
        navigate('/login')
       }        if (!loading && !error && data) {
        console.log("SAVED RECIPES:",data.user.savedRecipes);
        console.log("CREATE RECIPES:",data.user.createdRecipes);
            let temp=data.user.savedRecipes;
            temp=temp.concat(data.user.createdRecipes);
            setRecipes(temp || []);
        }

    }, [navigate,loading, error, data]);


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
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <div className="GridContainer">
            <div className="NavContainer">
                <RecipesForm 
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
                    <button  onClick={logout}>Logout</button>
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