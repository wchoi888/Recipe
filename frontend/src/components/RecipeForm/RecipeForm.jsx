import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../../utils/queries';
import { useState, useEffect } from 'react';
import { ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from '../../utils/mutations';

const RecipeForm = ({ selectedRecipe, clearSelection }) => {
    const [inputFields, setInputFields] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    const [addRecipe] = useMutation(ADD_RECIPE);
    const [editRecipe] = useMutation(EDIT_RECIPE);
    const [deleteRecipe] = useMutation(DELETE_RECIPE);

    useEffect(() => {
        if (selectedRecipe) {
            setInputFields({
                title: selectedRecipe.recipeName,
                ingredients: selectedRecipe.ingredients,
                instructions: selectedRecipe.instructions
            });
        } else {
            setInputFields({ title: '', ingredients: '', instructions: '' });
        }
    }, [selectedRecipe]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputFields(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateRecipe = () => {
        // Check if all required fields are filled out
        if (!inputFields.title || !inputFields.ingredients || !inputFields.instructions) {
            alert("Please fill out all required fields.");
            return;
        }

        if (selectedRecipe) {
            editRecipe({
                variables: {
                    recipeId: selectedRecipe._id,
                    title: inputFields.title,
                    ingredients: inputFields.ingredients,
                    instructions: inputFields.instructions
                }
            });
        } else {
            addRecipe({
                variables: {
                    title: inputFields.title,
                    ingredients: inputFields.ingredients,
                    instructions: inputFields.instructions
                }
            });
        }

        clearForm();
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipe) {
            deleteRecipe({ variables: { recipeId: selectedRecipe._id } });
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
