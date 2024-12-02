// Data storage for recipes
let recipes = [];

// DOM elements
const recipeForm = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');

// Handle form submission to add a recipe
recipeForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  const image = document.getElementById('image').files[0];

  const newRecipe = {
    id: Date.now(),
    title,
    ingredients,
    instructions,
    image: image ? URL.createObjectURL(image) : null
  };

  recipes.push(newRecipe);
  displayRecipes();
  recipeForm.reset();
});

// Display the list of recipes
function displayRecipes() {
  recipeList.innerHTML = '';
  recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}" width="100">` : ''}
      <button class="edit" onclick="editRecipe(${recipe.id})">Edit</button>
      <button class="delete" onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;
    recipeList.appendChild(li);
  });
}

// Edit a recipe
function editRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    // Optional: Handle image edit if necessary
    deleteRecipe(id);
  }
}

// Delete a recipe
function deleteRecipe(id) {
  recipes = recipes.filter(recipe => recipe.id !== id);
  displayRecipes();
}

// Optional: Store recipes in local storage to persist across page reloads
window.onload = function() {
  const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
  if (savedRecipes) {
    recipes = savedRecipes;
    displayRecipes();
  }
};

// Save recipes to local storage whenever a change occurs
window.onbeforeunload = function() {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};