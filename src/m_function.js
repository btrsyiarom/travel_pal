// set const using ID assigned at index.html
const mealButton = document.querySelector('#meal-button');
const mealInput = document.querySelector('#meal-input');
const mealList = document.querySelector('#meal-list');

//add addeventlistener for button
mealButton.addEventListener('click', () => {
  const searchQuery = mealInput.value.trim();
  if (searchQuery) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    //fetch const name for api url which is apiUrl
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        mealList.innerHTML = ''; // clear before this search result
        if (data.meals) {
          data.meals.forEach(meal => {
            // Create a new list item with the meal name, recipe, image plus ingredients
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
            <div class="first-cont">             
             <h2>${meal.strMeal}</h2>
              <p style="margin-top: 20px; font-size: 16px;">Category : ${meal.strCategory}</p>

              <div class="image-food" style="display: flex;">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="40%">
              </div>

              <div class ="food-ingrd">
                <h3>Food Ingredients</h3>
                <ul style="list-style-type: none;">
                  ${Object.keys(meal)
                    .filter(key => key.startsWith('strIngredient') && meal[key])
                    .map(key => `<li>${meal[key]}</li>`)
                    .join('')}
                </ul>
              </div>
              <div class ="food-recipe">
              <h3>Recipe</h3>
              <p>${meal.strInstructions}</p>
              </div>
            <div>
            `;
            
            newMeal.style.listStyle = 'none';
            mealList.appendChild(newMeal);
          });
        } else {
          const noResults = document.createElement('li');
          // no result it will show this:
          noResults.textContent = 'No results found.';
          mealList.appendChild(noResults);
        }
      })

      .catch(error => console.error(error));
  }
});

