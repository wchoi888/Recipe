import React, { useState, useEffect } from 'react';

const RecipeForm = ({ addRecipe, deleteRecipe, editRecipe, selectedRecipe, clearSelection }) => {
    const [inputFields, setInputFields] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    // If a selected recipe is passed in, this effect will update the form fields to show the selected recipe's data for editing.
    useEffect(() => {
        if (selectedRecipe) {
            setInputFields({
                title: selectedRecipe.title,
                ingredients: selectedRecipe.ingredients,
                instructions: selectedRecipe.instructions
            });
        } else {
            // Clear the form if there is no selected recipe (when user clicks "Clear Form")
            setInputFields({ title: '', ingredients: '', instructions: '' });
        }
    }, [selectedRecipe]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputFields(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateRecipe = () => {
        if (selectedRecipe) {
            // Call the editRecipe function if a recipe is being edited
            editRecipe(selectedRecipe.id, inputFields.title, inputFields.ingredients, inputFields.instructions);
        } else {
            // Call the addRecipe function if a new recipe is being added
            addRecipe(inputFields.title, inputFields.ingredients, inputFields.instructions);
        }
        clearForm();
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipe) {
            // Call the deleteRecipe function if a recipe is selected
            deleteRecipe(selectedRecipe.id);
            clearForm();
        } else {
            alert("Please select a recipe to delete.");
        }
    };

    // Reset form fields and clear selected recipe
    const clearForm = () => {
        setInputFields({ title: '', ingredients: '', instructions: '' });
        clearSelection(); 
    };

    return (
        <div className="recipe-form">
            <form>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={inputFields.title}
                    onChange={handleInputChange}
                />

                <label htmlFor="ingredients">Ingredients:</label>
                <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={inputFields.ingredients}
                    onChange={handleInputChange}
                />

                <label htmlFor="instructions">Instructions:</label>
                <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    value={inputFields.instructions}
                    onChange={handleInputChange}
                />

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
