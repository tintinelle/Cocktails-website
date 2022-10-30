'use strict';

// Ильвина начало

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const selectList = document.getElementById('selectList');
const errorMessage = document.getElementById('errorMessage');
const cardsContainer = document.getElementById('cardsContainer');

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
const displayIngredient = (div, url, name, alco, abv, about) => {
    div.innerHTML = '';
    const wrap = document.createElement('div');
    const picture = document.createElement('img');
    const ingredientName = document.createElement('h2');
    const alcoholic = document.createElement('p');
    const degree = document.createElement('p');
    const description = document.createElement('div');

    wrap.className = 'ingredient-card';
    picture.src = url;
    ingredientName.textContent = name;
    alcoholic.textContent = `Alcoholic: ${alco}`;
    degree.textContent = `Alcohol by volume: ${abv}`;
    description.textContent = about;

    div.append(wrap);
    wrap.append(picture);
    wrap.append(ingredientName);
    wrap.append(alcoholic);
    wrap.append(degree);
    wrap.append(description);

    // document.getElementById('image').src = `https://www.thecocktaildb.com/images/ingredients/${searchInput.value}-Medium.png`;
    // document.getElementById("name").innerText = data.ingredients[0].strIngredient;
    // document.getElementById("recipe").innerText = data.ingredients[0].strDescription;
}

// ищем ингредиент по названию
const searchIngredientByName = (ingredientName) => {
    errorMessage.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayIngredient(cardsContainer, `https://www.thecocktaildb.com/images/ingredients/${searchInput.value}-Medium.png`, data.ingredients[0].strIngredient, data.ingredients[0].strAlcohol, data.ingredients[0].strABV, data.ingredients[0].strDescription);
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
    for (let i = 0; i < 5; i++) {
        document.getElementById('image').src = data.drinks[i].strDrinkThumb;
        document.getElementById("name").innerText = data.drinks[i].strDrink;
        document.getElementById("indredients").innerText = "Ingredients: " + data.drinks[i].strIngredient1 + ", " + data.drinks[i].strIngredient2 + ", " + data.drinks[i].strIngredient3 + ", " + data.drinks[i].strIngredient4;
        document.getElementById("recipe").innerText = data.drinks[i].strInstructions;
        document.getElementById("alcoholic").innerText = "Type: " + data.drinks[i].strAlcoholic;
        document.getElementById("glass").innerText = "Glass: " + data.drinks[i].strGlass;
        // document.getElementById("recipe").innerText = "Instructions: " + data.drinks[i].strInstructions;

        let Instruction = data.drinks[0].strInstructions;
        let Instrsplit = Instruction.split('.');
        console.log(Instrsplit);
        for (let i = 0; i < Instrsplit.length; i++) {
            document.getElementById("recipe").innerText = "Instructions: " + Instrsplit.join('.' + '\n');
        }
    }
}
// Саша конец