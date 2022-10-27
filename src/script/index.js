'use strict';

// Ильвина начало

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const selectList = document.getElementById('selectList');
const errorMessage = document.getElementById('errorMessage');

// ищем коктейль по названию
const searchCocktailByName = (cocktailName) => {
    errorMessage.innerHTML = '';
    // console.log(cocktailName);

    const cocktailNameFiltered = cocktailName.trim().split(" ")[0];
    // console.log(cocktailNameFiltered);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailNameFiltered}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.getElementById('image').src = data.drinks[0].strDrinkThumb;
        })
        .catch(err => {
            console.log(err)
            errorMessage.innerHTML = 'Failed to find a cocktail. Please try another word.'
        });
}

// ищем коктейль по ингредиенту
const searchCocktailByIngredient = (cocktail) => {
    errorMessage.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById('image').src = data.drinks[0].strDrinkThumb;
    })
    .catch(err => {
        console.log(err)
        errorMessage.innerHTML = 'Failed to find a cocktail. Please try another word.'
    });
}

// ищем ингредиент по названию
const searchIngredientByName = (ingredientName) => {
    errorMessage.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById('image').src = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Medium.png`;
    })
    .catch(err => {
        console.log(err)
        errorMessage.innerHTML = 'Failed to find an ingredient. Please try another word.'
    });
}

// действия при нажатии на кнопку поиска
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
// Ильвина конец

// Саша начало

// document.addEventListener("DOMContentLoaded",
//     function (event) {
//         fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007")
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById('image').src = data.drinks[0].strDrinkThumb;
//                 document.getElementById("name").innerText = data.drinks[0].strDrink;
//                 document.getElementById("indredients").innerText = "Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strIngredient4;
//                 document.getElementById("recipe").innerText = data.drinks[0].strInstructions;
//             })
//             .catch(error => console.log(error));
//     })
// Саша конец

//Пати начало
// Поиск случайного коктейля
document.addEventListener("DOMContentLoaded",
    function (event) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {
                document.querySelector('.').src = data.drinks[0].strDrinkThumb;

            })
    })
// const searchRandomCocktail = (randomCocktail) => {
//     errorMessage.innerHTML = '';

//}

//Пати конец
