document.addEventListener('DOMContentLoaded', function () {
  var userFormEl = document.querySelector('.search-form');
  var cuisineButtonsEl = document.querySelector('.button-container');
  var foodInputEl = document.querySelector('#query');
  var recipeContainerEl = document.querySelector('#recipes-container');
  var foodSearchTerm = document.querySelector('#food-search-term');

  var formSubmitHandler = function (event) {
    event.preventDefault();

    var query = foodInputEl.value.trim();
    var cuisine = event.submitter.getAttribute('data-cuisine');

    if (query || cuisine) {
      searchRecipes(query, cuisine);
      foodInputEl.value = '';
    } else {
      alert('Please enter a recipe query or select a cuisine');
    }
  };

  var buttonClickHandler = function (event) {
    if (event.target.getAttribute('data-cuisine')) {
      event.submitter = event.target;
      formSubmitHandler(event);
    }
  };

  var searchRecipes = function (query, cuisine) {
    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    var apiKey = 'b60a2d9ee19244aa9a72d17980d815e4';

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
    foodSearchTerm.textContent = query || cuisine;

    recipeContainerEl.innerHTML = ''; // Clears previous recipe results

    if (recipes.length === 0) {
      recipeContainerEl.textContent = 'No recipes found.';
      return;
    }

    for (var i = 0; i < recipes.length; i++) {
      var recipeEl = document.createElement('div');
      var sourceUrl = document.createElement('a');

      recipeEl.classList = 'list-item';
      // sourceUrl.classList = 'list-item';
      sourceUrl.classList.add('list-item');
      recipeEl.textContent = recipes[i].title;
      // sourceUrl.textContent = data.recipes[i].sourceUrl;
      sourceUrl.setAttribute('href', recipes[i].sourceUrl);
      sourceUrl.textContent = 'Read More';

      recipeContainerEl.appendChild(recipeEl);
      recipeContainerEl.appendChild(sourceUrl);
    }
  };

  userFormEl.addEventListener('submit', formSubmitHandler);
  cuisineButtonsEl.addEventListener('click', buttonClickHandler);
});

var searchInput = document.querySelector(".search-text");
var searchForm = document.querySelector(".search-form");
var searchList = document.querySelector("#search-list");


var searches = [];

function renderSearches() {

  searchList.innerHTML = "";



  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];

    var li = document.createElement("li");
    li.textContent = search;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Delete Recent Search";

    li.appendChild(button);
    searchList.appendChild(li);
  }
}


function init() {

  var storedSearches = JSON.parse(localStorage.getItem("searches"));

  if (storedSearches !== null) {
    searches = storedSearches;
  }


  renderSearches();
}

function storeSearches() {

  localStorage.setItem("searches", JSON.stringify(searches));
}


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var searchText = searchInput.value.trim();


  if (searchText === "") {
    return;
  }


  searches.push(searchText);
  searchInput.value = "";


  storeSearches();
  renderSearches();
});

searchList.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {

    var index = element.parentElement.getAttribute("data-index");
    searches.splice(index, 1);


    storeSearches();
    renderSearches();
  }
});


init()




// Google translate funtion:
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en' },
    'google_translate_element'
  );
}
