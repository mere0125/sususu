// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const ingredient = document.getElementById('ingredient').value;
    if (ingredient.trim() !== '') {
        fetchRecipes(ingredient);
    } else {
        alert('Please enter an ingredient!');
    }
});

// Fetch recipes from the API
async function fetchRecipes(ingredient) {
    try {
        const response = await fetch(`https://your-classmate-api-url.com/recipes?ingredient=${ingredient}`);
        if (response.ok) {
            const data = await response.json();
            displayRecipes(data);
        } else {
            alert('Error fetching recipes. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error connecting to the API.');
    }
}

// Display recipes dynamically in the results section
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found. Try a different ingredient!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe');
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
        recipeList.appendChild(recipeCard);
    });
}
