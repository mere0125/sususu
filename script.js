document.getElementById('find-meals').addEventListener('click', findMeals);

async function findMeals() {
    const dietType = document.getElementById('diet-select').value;
    const calorieRange = document.getElementById('calories-select').value;
    const resultsContainer = document.getElementById('meal-results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    if (!dietType || !calorieRange) {
        alert('Please select both diet type and calorie range');
        return;
    }

    try {
        const response = await fetch(`https://susu-meal-prep-c3aeda193e35.herokuapp.com/meals?diet=${dietType}&calories=${calorieRange}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const meals = await response.json();

        if (meals.length === 0) {
            resultsContainer.innerHTML = '<p>No meals found matching your criteria.</p>';
            return;
        }

        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <h3>${meal.name}</h3>
                <p><strong>Diet:</strong> ${meal.diet}</p>
                <p><strong>Calories:</strong> ${meal.calories}</p>
                <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${meal.instructions}</p>
            `;
            resultsContainer.appendChild(mealCard);
        });
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Error fetching meals: ${error.message}</p>`;
    }
}
