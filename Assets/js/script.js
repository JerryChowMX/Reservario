var userFormEl = document.querySelector('#user-form');
var cuisineButtonsEl = document.querySelector('#cuisine-buttons');
var foodInputEl = document.querySelector('#query');
var recipeContainerEl = document.querySelector('#recipes-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var query = foodInputEl.value.trim();
  var cuisine = event.submitter.getAttribute('data-cuisine'); // Get cuisine information     

  if (query || cuisine) {
    searchRecipes(query, cuisine);

    recipeContainerEl.textContent = '';
    foodInputEl.value = '';
  } else {
    alert('Please enter a recipe query or select a cuisine');
  }
};

var buttonClickHandler = function (event) {
  if (event.target.getAttribute('data-cuisine')) {
    event.submitter = event.target; // Set the submitter to the clicked button
    formSubmitHandler(event); // Trigger form submission with the clicked button's data
  }
};

var searchRecipes = function (query, cuisine) {
  var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  var apiKey = '2a90fe47e07f4eaf8fdb94eef7e059df'; // API Key

  // Building API key, to include addRecipeInformation
  apiUrl += '?apiKey=' + apiKey;

  if (query) {
    apiUrl += '&query=' + query + '&addRecipeInformation=true';
  }

  if (cuisine) {
    apiUrl += '&cuisine=' + cuisine + '&addRecipeInformation=true';
  }

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (data) {
      console.log(data);
      displayRecipes(data.results, query, cuisine);
    })
    .catch(function (error) {
      console.error('There has been a problem with your fetch operation:', error);
    });
};

var displayRecipes = function (recipes, query, cuisine) {
  repoSearchTerm.textContent = query || cuisine;

  if (recipes.length === 0) {
    recipeContainerEl.textContent = 'No recipes found.';
    return;
  }

  for (var i = 0; i < recipes.length; i++) {
    var recipeEl = document.createElement('div');
    recipeEl.classList = 'list-item';
    recipeEl.textContent = recipes[i].title;


    recipeContainerEl.appendChild(recipeEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
cuisineButtonsEl.addEventListener('click', buttonClickHandler);
