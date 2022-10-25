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


// fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=spritz')
// .then(response => response.json())
// .then(data => {
//     console.log(data);

//     document.getElementById('image').src = data.drinks[0].strDrinkThumb;
// })
// .catch(err => console.log(err));




// dateModified: "2015-08-18 14:42:59"
// idDrink: "11007"
// strAlcoholic: "Alcoholic"
// strCategory: "Ordinary Drink"
// strCreativeCommonsConfirmed: "Yes"
// strDrink: "Margarita"
// strDrinkAlternate: null
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
// strGlass: "Cocktail glass"
// strIBA: "Contemporary Classics"
// strImageAttribution: "Cocktailmarler"
// strImageSource: "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg"
// strIngredient1: "Tequila"
// strIngredient2: "Triple sec"
// strIngredient3: "Lime juice"
// strIngredient4: "Salt"
// strIngredient5: null
// strIngredient6: null
// strIngredient7: null
// strIngredient8: null
// strIngredient9: null
// strIngredient10: null
// strIngredient11: null
// strIngredient12: null
// strIngredient13: null
// strIngredient14: null
// strIngredient15: null
// strInstructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass."
// strInstructionsDE: "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben."
// strInstructionsES: null
// strInstructionsFR: null
// strInstructionsIT: "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere."
// strInstructionsZH-HANS: null
// strInstructionsZH-HANT: null
// strMeasure1: "1 1/2 oz "
// strMeasure2: "1/2 oz "
// strMeasure3: "1 oz "
// strMeasure4: null
// strMeasure5: null
// strMeasure6: null
// strMeasure7: null
// strMeasure8: null
// strMeasure9: null
// strMeasure10: null
// strMeasure11: null
// strMeasure12: null
// strMeasure13: null
// strMeasure14: null
// strMeasure15: null
// strTags: "IBA,ContemporaryClassic"
// strVideo: null




// {drinks: Array(6)}
// drinks: Array(6)
// 0: {idDrink: '11007', strDrink: 'Margarita', strDrinkAlternate: null, strTags: 'IBA,ContemporaryClassic', strVideo: null, …}
// 1: {idDrink: '11118', strDrink: 'Blue Margarita', strDrinkAlternate: null, strTags: null, strVideo: null, …}
// 2: {idDrink: '17216', strDrink: "Tommy's Margarita", strDrinkAlternate: null, strTags: 'IBA,NewEra', strVideo: null, …}
// 3: {idDrink: '16158', strDrink: 'Whitecap Margarita', strDrinkAlternate: null, strTags: null, strVideo: null, …}
// 4: {idDrink: '12322', strDrink: 'Strawberry Margarita', strDrinkAlternate: null, strTags: null, strVideo: null, …}
// 5: {idDrink: '178332', strDrink: 'Smashed Watermelon Margarita', strDrinkAlternate: null, strTags: null, strVideo: null, …}
// length: 6
// [[Prototype]]: Array(0)
// [[Prototype]]: Object