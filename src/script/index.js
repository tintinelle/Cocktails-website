'use strict';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const selectList = document.getElementById('selectList');

const searchCocktailByName = (cocktailName) => {
    // console.log(cocktailName);

    const cocktailNameFiltered = cocktailName.trim().split(" ")[0];
    // console.log(cocktailNameFiltered);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailNameFiltered}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.getElementById('image').src = data.drinks[0].strDrinkThumb;
        })
        .catch(err => console.log(err));
}

const searchCocktailByIngredient = (cocktail) => {

    fetch(`www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById('image').src = data.drinks[0].strDrinkThumb;
    })
    .catch(err => console.log(err));
}

const searchIngredientByName = (ingredientName) => {

    fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById('image').src = data.drinks[0].strDrinkThumb;
    })
    .catch(err => console.log(err));
}

searchButton.addEventListener('click', () => {
    const listValue = selectList.options[selectList.selectedIndex].value;

    if (listValue == "cocktail-name") {
        searchCocktailByName(searchInput.value);
    }

    if (listValue == "cocktail-ingredient") {
        searchCocktailByIngredient(searchInput.value);
    }

    if (listValue == "ingredient-name") {
        searchIngredientByName(searchInput.value);
    }
})


// Саша начало

document.addEventListener("DOMContentLoaded",
    function (event) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007")
            .then(response => response.json())
            .then(data => {
                document.getElementById('image').src = data.drinks[0].strDrinkThumb;
                document.getElementById("name").innerText = data.drinks[0].strDrink;
                document.getElementById("indredients").innerText = "Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strIngredient4;
                document.getElementById("recipe").innerText = data.drinks[0].strInstructions;
            })
            .catch(error => console.log(error));
    })
    // Саша конец
