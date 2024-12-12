// API Base URL
const API_BASE_URL = 'https://meal-prep-app-9fa53b497e7c.herokuapp.com';

// DOM Elements
const allMealsBtn = document.getElementById('all-meals-btn');
const vegetarianBtn = document.getElementById('vegetarian-btn');
const nonVegetarianBtn = document.getElementById('non-vegetarian-btn');
const mealsContainer = document.getElementById('meals-container');

// Fetch and display meals
async function fetchMeals(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const meals = await response.json();
        displayMeals(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        mealsContainer.innerHTML = '<p>Error loading meals. Please try again.</p>';
    }
}

// Create meal card HTML
function createMealCard(meal) {
    return `
        <div class="meal-card">
            <img src="${meal.imageUrl}" alt="${meal.name}">
            <h3>${meal.name}</h3>
            <p>Category: ${meal.category}</p>
            <p>Preparation Time: ${meal.preparationTime} minutes</p>
            <p>Difficulty: ${meal.difficulty}</p>
        </div>
    `;
}

// Display meals in the container
function displayMeals(meals) {
    mealsContainer.innerHTML = meals.length 
        ? meals.map(createMealCard).join('')
        : '<p>No meals found.</p>';
}

// Event Listeners
allMealsBtn.addEventListener('click', () => fetchMeals('/meals'));
vegetarianBtn.addEventListener('click', () => fetchMeals('/meals/vegetarian'));
nonVegetarianBtn.addEventListener('click', () => fetchMeals('/meals/nonvegetarian'));

// Initial load of all meals
fetchMeals('/meals');
