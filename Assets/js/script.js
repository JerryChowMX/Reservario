var userFormEl = document.querySelector('#user-form');
var cuisineButtonsEl = document.querySelector('#cuisine-buttons');
var foodInputEl = document.querySelector('#query');
var recipeContainerEl = document.querySelector('#recipes-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var query = foodInputEl.value.trim();
  var cuisine = event.submitter.getAttribute('data-cuisine'); // Get cuisine from clicked button

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
  var apiKey = '2a90fe47e07f4eaf8fdb94eef7e059df'; // Replace with your Spoonacular API key

  // Construct the API URL with query and cuisine parameters
  apiUrl += '?apiKey=' + apiKey;

  if (query) {
    apiUrl += '&query=' + query;
  }

  if (cuisine) {
    apiUrl += '&cuisine=' + cuisine;
  }

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (data) {
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

var valueSearch = document.getElementById("query");
var searchForm = document.querySelector("searchForm");
var searchList = document.querySelector("search-list");

var searches = [];

// The following function renders items in a todo list as <li> elements
function renderSearches() {


  // Render a new li for each todo
  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];

    var li = document.createElement("li");
    li.textContent = search;
    li.setAttribute("data-index", i);

    searchList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedSearches = JSON.parse(localStorage.getItem("searches"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedSearches !== null) {
    searches = storedSearches;
  }

  // This is a helper function that will render todos to the DOM
  renderSearches();
}

function storeSearches() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Add submit event to form
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var searchText = query.value.trim();

  // Return from function early if submitted todoText is blank
  if (searchText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  searches.push(searchText);
  query.value = "";

  // Store updated todos in localStorage, re-render the list
  storeSearches();
  renderSearches();
});


// Calls init to retrieve data and render it to the page on load
init()
