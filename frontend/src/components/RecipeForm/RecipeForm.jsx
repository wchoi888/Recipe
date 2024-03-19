//this is where users fill out the input form for the recipe they want to create
//they can create a title for their recipe and include the ingredients and instructions
//once they click "add recipe" the recipe will be included in the "my recipes" list
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../utils/queries';
import  { useState, useEffect } from 'react';

const RecipeForm = ({ addRecipe, deleteRecipe, editRecipe, selectedRecipe, clearSelection }) => {
    const [inputFields, setInputFields] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    useEffect(() => {
        if (selectedRecipe) {
            setInputFields({
                title: selectedRecipe.name,
                ingredients: selectedRecipe.ingredients,
                instructions: selectedRecipe.instructions
            });
        } else {
           
            setInputFields({ title: '', ingredients: '', instructions: '' });
        }
    }, [selectedRecipe]);
    console.log("Hi")
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    console.log("Hi",data)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputFields(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateRecipe = () => {
        if (selectedRecipe) {
            editRecipe(selectedRecipe.id, inputFields.name, inputFields.ingredients, inputFields.instructions);
        } else {
            addRecipe(inputFields.name, inputFields.ingredients, inputFields.instructions);
        }
        clearForm();
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipe) {
            deleteRecipe(selectedRecipe.id);
            clearForm();
        } else {
            alert("Please select a recipe to delete.");
        }
    };

    const clearForm = () => {
        setInputFields({ title: '', ingredients: '', instructions: '' });
        clearSelection(); 
    };

    return (
        <div className="recipe-form">
            {error && <p>Error: {error.message}</p>}
            <form>
                <input
                placeholder="Name"
                    type="text"
                    id="name"
                    name="name" 
                    value={inputFields.name}
                    onChange={handleInputChange}
                />
                <input
                    placeholder="ingredients"
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={inputFields.ingredients}
                    onChange={handleInputChange}
                />
                <select id="category" name="category">
                <option>Select Category</option>
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
                    value={inputFields.instruction}
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
