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
            displayCocktails(cardsContainer, data);
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
const displayIngredient = (div, data) => {
    div.innerHTML = '';
    const wrap = document.createElement('div');
    const picture = document.createElement('img');
    const ingredientName = document.createElement('h2');
    const alcoholic = document.createElement('p');
    const degree = document.createElement('p');
    const description = document.createElement('div');

    // разрезаем описание и берем первые 2 предложения
    const descriptionArr = data.ingredients[0].strDescription.split('.');
    // console.log(descriptionArr);
    for (let i = 0; i < 2; i++) {
        description.textContent += `${descriptionArr[i]}.`;
    }

    wrap.className = 'ingredient-card';
    picture.src = `https://www.thecocktaildb.com/images/ingredients/${searchInput.value}-Medium.png`;
    ingredientName.textContent = data.ingredients[0].strIngredient;
    alcoholic.textContent = `Alcoholic: ${data.ingredients[0].strAlcohol}`;
    if (data.ingredients[0].strABV) {
        degree.textContent = `Alcohol by volume: ${data.ingredients[0].strABV}%`;
    }

    div.append(wrap);
    wrap.append(picture);
    wrap.append(ingredientName);
    wrap.append(alcoholic);
    wrap.append(degree);
    wrap.append(description);
}

// ищем ингредиент по названию
const searchIngredientByName = (ingredientName) => {
    errorMessage.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayIngredient(cardsContainer, data);
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

// пробуем отрисовку
const displayCocktails = (div, data) => {

    div.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const wrap_card = document.createElement('div');
        const name_card = document.createElement('h2');
        const picture_card = document.createElement('img');
        const indredients_card = document.createElement('p');
        const alcoholic_card = document.createElement('p');
        const glass_card = document.createElement('div');

        wrap_card.classList.add('card');
        name_card.textContent = data.drinks[i].strDrink;
        picture_card.src = data.drinks[i].strDrinkThumb;
        indredients_card.textContent = `Ingredients: ${data.drinks[i].strIngredient1}, ${data.drinks[i].strIngredient2}, ${data.drinks[i].strIngredient3}, ${data.drinks[i].strIngredient4}`;
        alcoholic_card.textContent = `Type: ${data.drinks[i].strAlcoholic}`;
        glass_card.textContent = `Glass: ${data.drinks[i].strGlass}`;
        div.append(wrap_card);

        wrap_card.append(name_card);
        wrap_card.append(picture_card);
        wrap_card.append(indredients_card);
        wrap_card.append(alcoholic_card);
        wrap_card.append(glass_card);
    }
}

// Ильвина конец

// Саша начало

// const displayCocktails = (data) => {
//     for (let i = 0; i < 5; i++) {
//         document.getElementById('image').src = data.drinks[i].strDrinkThumb;
//         document.getElementById("name").innerText = data.drinks[i].strDrink;
//         document.getElementById("indredients").innerText = "Ingredients: " + data.drinks[i].strIngredient1 + ", " + data.drinks[i].strIngredient2 + ", " + data.drinks[i].strIngredient3 + ", " + data.drinks[i].strIngredient4;
//         document.getElementById("recipe").innerText = data.drinks[i].strInstructions;
//         document.getElementById("alcoholic").innerText = "Type: " + data.drinks[i].strAlcoholic;
//         document.getElementById("glass").innerText = "Glass: " + data.drinks[i].strGlass;
//         // document.getElementById("recipe").innerText = "Instructions: " + data.drinks[i].strInstructions;

//         let Instruction = data.drinks[0].strInstructions;
//         let Instrsplit = Instruction.split('.');
//         console.log(Instrsplit);
//         for (let i = 0; i < Instrsplit.length; i++) {
//             document.getElementById("recipe").innerText = "Instructions: " + Instrsplit.join('.' + '\n');
//         }
//     }
// }
// Саша конец


//Пати начало
// Поиск случайного коктейля
document.addEventListener("DOMContentLoaded",
    function (event) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {
                // console.log(data);
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
// document.querySelector('#update').addEventListener('click', updateList)
//Пати конец