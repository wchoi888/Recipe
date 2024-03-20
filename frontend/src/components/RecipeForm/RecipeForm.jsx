//this is where users fill out the input form for the recipe they want to create
//they can create a title for their recipe and include the ingredients and instructions
//once they click "add recipe" the recipe will be included in the "my recipes" list
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../../utils/queries';
import  { useState, useEffect } from 'react';
import { ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from '../../utils/mutations';

const RecipeForm = ({  selectedRecipe, clearSelection }) => {
    const [inputFields, setInputFields] = useState({
        title: '',
        ingredients: '',
        category: '',
        instructions: ''
    });
    const [addRecipe] = useMutation(ADD_RECIPE)
    const [editRecipe] = useMutation(EDIT_RECIPE)
    const [deleteRecipe] = useMutation(DELETE_RECIPE)


    useEffect(() => {
        if (selectedRecipe) {
            setInputFields({
                title: selectedRecipe.recipeName,
                ingredients: selectedRecipe.ingredients,
                category: selectedRecipe.category,
                instructions: selectedRecipe.instructions
            });
        } else {
           
            setInputFields({ title: '', ingredients: '', category:'',instructions: '' });
        }
    }, [selectedRecipe]);
    const { loading, data } = useQuery(GET_CATEGORIES);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputFields(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateRecipe = () => {
        if (selectedRecipe) {
            editRecipe({
                variables:{
                    recipeId: selectedRecipe._id,
                    title: inputFields.title,
                    ingredients: inputFields.ingredients,
                    category: inputFields.category,
                    instructions: inputFields.instructions
                }
         });
        } else {
            addRecipe({
               variables:{
                title: inputFields.title,
                ingredients: inputFields.ingredients,
                category: inputFields.category,
                instructions: inputFields.instructions
               }
        }); 
         window.location.reload();
        }
        clearForm();
      
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipe) {
            deleteRecipe({variables: {recipeId: selectedRecipe._id}});
            clearForm();
            window.location.reload();
        } else {
            alert("Please select a recipe to delete.");
        }
    };

    const clearForm = () => {
        setInputFields({ title: '', ingredients: '', category: '', instructions: '' });
        clearSelection(); 
    };

    return (
        <div className="recipe-form">
            <form>
                <input
                placeholder="Recipe Name"
                    type="text"
                    id="title"
                    name="title" 
                    value={inputFields.title}
                    onChange={handleInputChange}
                />
                <input
                    placeholder="Ingredients: separate each ingredient with a comma."
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={inputFields.ingredients}
                    onChange={handleInputChange}
                />
                <select id="category" name="category" value={inputFields.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                {(loading)?(<option>Loading...</option>):(data.categories.map(category => (
                    <option key={category._id} value={category._id}>
                        {category.categoryName}
                    </option>
                )))}
                </select>
                <textarea
                    placeholder="Instruction"
                    id="instructions"
                    name="instructions"
                    value={inputFields.instructions}
                    onChange={handleInputChange}
                ></textarea>

                <button type="button" onClick={handleAddOrUpdateRecipe}>
                    {selectedRecipe ? 'Update Recipe' : 'Add Recipe'}
                </button>
                {selectedRecipe && (
                    <button type="button" onClick={handleDeleteRecipe}>
                        Delete Recipe
                    </button>
                )}
                <button type="button" onClick={clearForm}>Clear Form</button>
            </form>
        </div>
    );
};

export default RecipeForm;
