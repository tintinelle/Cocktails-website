'use strict';

// Ильвина начало

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const selectList = document.getElementById('selectList');
const errorMessage = document.getElementById('errorMessage');


// ищем коктейль по названию
const searchCocktailByName = (cocktailName) => {
    errorMessage.innerHTML = '';

    const cocktailNameFiltered = cocktailName.trim().split(" ")[0];

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailNameFiltered}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCocktails(data);
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
        // так как при поиске коктейля по ингредиенту сервер выдает лишь название и фото, отправляем искать коктейль по названию, а уже оттуда отправляем на отрисовку:
        searchCocktailByName(data.drinks[0].strDrink);
    })
    .catch(err => {
        console.log(err)
        errorMessage.innerHTML = 'Failed to find a cocktail. Please try another word.'
    });
}

// отрисовываем карточку с ингредиентом
const displayIngredient = (data) => {
    document.getElementById('image').src =  `https://www.thecocktaildb.com/images/ingredients/${searchInput.value}-Medium.png`;
    document.getElementById("name").innerText = data.ingredients[0].strIngredient;
    document.getElementById("recipe").innerText = data.ingredients[0].strDescription;
}

// ищем ингредиент по названию
const searchIngredientByName = (ingredientName) => {
    errorMessage.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayIngredient(data);
        // document.getElementById('image').src = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Medium.png`;
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

const displayCocktails = (data) => {
    document.getElementById('image').src = data.drinks[0].strDrinkThumb;
    document.getElementById("name").innerText = data.drinks[0].strDrink;
    document.getElementById("indredients").innerText = "Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strIngredient4;
    document.getElementById("recipe").innerText = data.drinks[0].strInstructions;
}

// Саша конец

//Пати начало
// Поиск случайного коктейля
document.addEventListener("DOMContentLoaded",
    function (event) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.querySelector('.random-card_image').src = data.drinks[0].strDrinkThumb;
                document.querySelector(".random-card_name").innerText = data.drinks[0].strDrink;
                document.querySelector(".random-card_ingredient").innerText = "Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strIngredient4;
                document.querySelector(".random-card_recipe").innerText = data.drinks[0].strInstructions;
            })
            .catch(err => {
                console.log(err)
                errorMessage.innerHTML = 'Failed to update cocktail list. Please try again.'
            });
    })

//Обновление блока случайных коктейлей (пока не знаю как реализовать)
// async function updateList() {
//     try {
//         const html = await (await fetch(location.src)).text();
//         const newList = new DOMParser().parseFromString(html, 'text/html');
//         document.querySelector('.random').outerHTML = newList.querySelector('.random').outerHTML;
//         console.log('.random');
//         return true;
//     } catch(err) {
//         console.error(err);
//         return false;
//     }
// }
document.querySelector('#update').addEventListener('click', updateList)
//Пати конец
