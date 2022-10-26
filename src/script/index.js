'use strict';
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