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
            errorMessage.classList.add('error-message');
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
            displayCocktailByIngredient(cardsContainer, data);
        })
        .catch(err => {
            console.log(err)
            errorMessage.classList.add('error-message');
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
            displayIngredient(cardsContainer, data);
        })
        .catch(err => {
            console.log(err)
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = 'Failed to find an ingredient. Please try another word.'
        });
}

// отрисовываем карточки с коктейлями по ингредиенту (там только фото и название), по клику на кнопку показываем полный рецепт
const displayCocktailByIngredient = (div, data) => {
    div.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        if (data.drinks[i]) {
            const wrap_card = document.createElement('div');
            const name_card = document.createElement('h2');
            const picture_card = document.createElement('img');
            const searchBtn_card = document.createElement('button');

            wrap_card.classList.add('card-by-ingredient');
            searchBtn_card.classList.add('card-button');
            name_card.textContent = data.drinks[i].strDrink;
            picture_card.src = data.drinks[i].strDrinkThumb;
            searchBtn_card.innerHTML = `Search cocktail recipe`;

            div.append(wrap_card);
            wrap_card.append(name_card);
            wrap_card.append(picture_card);
            wrap_card.append(searchBtn_card);

            searchBtn_card.addEventListener('click', () => {
                searchCocktailByName(data.drinks[i].strDrink);
            })
        }
    }
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
    for (let i = 0; i < 2; i++) {
        description.textContent += `${descriptionArr[i]}.`;
    }

    wrap.className = 'ingredient-card';
    picture.src = `https://www.thecocktaildb.com/images/ingredients/${searchInput.value}-Medium.png`;
    ingredientName.textContent = data.ingredients[0].strIngredient;
    alcoholic.innerHTML = `<b>Alcoholic:</b> ${data.ingredients[0].strAlcohol}`;
    if (data.ingredients[0].strABV) {
        degree.innerHTML = `<b>Alcohol by volume:</b> ${data.ingredients[0].strABV}%`;
    }

    div.append(wrap);
    wrap.append(picture);
    wrap.append(ingredientName);
    wrap.append(alcoholic);
    wrap.append(degree);
    wrap.append(description);
}


// отрисовка карточек коктейлей
const displayCocktails = (div, data) => {
    div.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        if (data.drinks[i]) {
            const wrap_card = document.createElement('div');
            const name_card = document.createElement('h2');
            const picture_card = document.createElement('img');
            const indredients_card = document.createElement('div');
            const alcoholic_card = document.createElement('div');
            const glass_card = document.createElement('div');
            const recipe_card = document.createElement('div');

            // достаем все пары ключ-значение из объекта с коктейлем, формируем массив, куда положим будущие ингредиенты
            let valuesAndKeys = Object.entries(data.drinks[i]);
            let cocktailIngredients = [];
            let ingredientsMeasures = [];
            // console.log(valuesAndKeys);

            // проходимся по парам ключ-значение
            for (let i = 0; i < valuesAndKeys.length; i++) {
                // ищем ключи со словом Ingredient, если такой ключ есть и его значение не null, записываем его в массив cocktailIngredients
                if (valuesAndKeys[i][0].includes('Ingredient') && valuesAndKeys[i][1] !== null) {
                    cocktailIngredients.push(valuesAndKeys[i][1]);
                }
                // проделываем то же самое с количеством каждого ингредиента
                if (valuesAndKeys[i][0].includes('Measure') && valuesAndKeys[i][1] !== null) {
                    ingredientsMeasures.push(valuesAndKeys[i][1].toLowerCase());
                }
            }

            wrap_card.classList.add('card'); 
            name_card.textContent = data.drinks[i].strDrink;
            picture_card.src = data.drinks[i].strDrinkThumb;
            alcoholic_card.innerHTML = `<b>Type:</b> ${data.drinks[i].strAlcoholic}`;
            glass_card.innerHTML = `<b>Glass:</b> ${data.drinks[i].strGlass}`;
            indredients_card.innerHTML = '<b>Ingredients:</b><br/>';
            recipe_card.innerHTML = '<b>Instructions:</b><br/>';

            // отрисовываем ингредиенты
            cocktailIngredients.forEach((el, i) => {
                if (!ingredientsMeasures[i]) {
                    ingredientsMeasures[i] = 'a bit';
                }
                indredients_card.innerHTML += `${cocktailIngredients[i]}   -   ${ingredientsMeasures[i]}<br/>`;
            })

            // отрисовываем рецепт
            let instruction = data.drinks[i].strInstructions;
            let instructions = instruction.split('.');
            instructions.forEach((el, i) => {
                if (instructions[i]) {
                    recipe_card.innerHTML += `&bull;  ${instructions[i]}<br/>`;
                }
            })

            div.append(wrap_card);
            wrap_card.append(name_card);
            wrap_card.append(picture_card);
            wrap_card.append(alcoholic_card);
            wrap_card.append(glass_card);
            wrap_card.append(indredients_card);
            wrap_card.append(recipe_card);
        }
    }
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
// Отрисовка случайного коктейля

function newRandomCard(event) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            document.querySelector('.random-card_image').src = data.drinks[0].strDrinkThumb;
            document.querySelector(".random-card_name").innerText = data.drinks[0].strDrink;
            document.querySelector(".random-card_ingredient").innerText = "Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strIngredient4;
            document.querySelector(".random-card_recipe").innerText = data.drinks[0].strInstructions;
            document.querySelector(".random-card_alcoholic").innerText = "Type: " + data.drinks[0].strAlcoholic;
            document.querySelector(".random-card_glass").innerText = "Glass: " + data.drinks[0].strGlass;

        })
        .catch(err => {
            console.log(err)
            errorMessage.innerHTML = 'Failed to update cocktail list. Please try again.'
        });
}

document.addEventListener("DOMContentLoaded", newRandomCard())

//Обновление блока случайных коктейлей

document.querySelector('#update').addEventListener('click', () => {
    newRandomCard()
})

//Пати конец