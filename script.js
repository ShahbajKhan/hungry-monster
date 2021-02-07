// This Function displays the food name and image when searched 
const showFoodList = foods => {
    const listDiv = document.getElementById("foodList");
    listDiv.className = "row"
    listDiv.innerHTML = "";
    foods.forEach(food => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "col-md-4 col-sm-6 mb-5";

        const foodInfo = `
                <div onclick="showDetails('${food.idMeal}')" class="card h-100">
                    <img class= "card-img-top" src="${food.strMealThumb}">
                    <div class="card-body">
                        <h5 class= "card-title text-center">${food.strMeal}</h3>
                    </div>
                </div>
        `
        foodDiv.innerHTML = foodInfo;
        listDiv.appendChild(foodDiv);
    });
}
// Search Button Handler
document.getElementById("search-btn").addEventListener("click", function () {
    const inputForm = document.getElementById("input");
    const foodDetailsDiv = document.getElementById("foodDetails");
    foodDetailsDiv.innerHTML = "";
    // Search foods by name or character
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputForm.value}`)
        .then(res => res.json())
        .then(data => showFoodList(data.meals))
        .catch(error => errorMessage());
});

const showDetails = meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;   
    fetch(url)
        .then(res => res.json())
        .then(data => renderFoodInfo(data.meals));

}
// Error Handling- if food name is not available
const errorMessage =()=>{
    const listDiv = document.getElementById("foodList");
    const message=`
        <h1 class="fw-bolder text-center">Food Name Not Found. Please Try Another Food</h1>
    `
    listDiv.innerHTML=message;
}

// This function renders food infos when clicked on food.
const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById("foodDetails");
    foodDetailsDiv.innerHTML = "";
    // Create Array for ingredients and measure
    const ingredients = [
        food[0].strMeasure1 + ' ' + food[0].strIngredient1,
        food[0].strMeasure2 + ' ' + food[0].strIngredient2,
        food[0].strMeasure3 + ' ' + food[0].strIngredient3,
        food[0].strMeasure4 + ' ' + food[0].strIngredient4,
        food[0].strMeasure5 + ' ' + food[0].strIngredient5,
        food[0].strMeasure6 + ' ' + food[0].strIngredient6,
        food[0].strMeasure7 + ' ' + food[0].strIngredient7,
        food[0].strMeasure8 + ' ' + food[0].strIngredient8,
        food[0].strMeasure9 + ' ' + food[0].strIngredient9,
        food[0].strMeasure10 + ' ' + food[0].strIngredient10,
        food[0].strMeasure11 + ' ' + food[0].strIngredient11,
        food[0].strMeasure12 + ' ' + food[0].strIngredient12,
        food[0].strMeasure13 + ' ' + food[0].strIngredient13,
        food[0].strMeasure14 + ' ' + food[0].strIngredient14,
        food[0].strMeasure15 + ' ' + food[0].strIngredient15,
        food[0].strMeasure16 + ' ' + food[0].strIngredient16,
        food[0].strMeasure17 + ' ' + food[0].strIngredient17,
        food[0].strMeasure18 + ' ' + food[0].strIngredient18,
        food[0].strMeasure19 + ' ' + food[0].strIngredient19,
        food[0].strMeasure20 + ' ' + food[0].strIngredient20

    ]
    // Retrieving the image for showing details 
    const img = document.createElement("img");
    img.setAttribute("src", `${food[0].strMealThumb}`);
    foodDetailsDiv.appendChild(img);

    // creating a div for showing the food name in ingredients list
    const div = document.createElement("div");
    const heading = `
        <h3 class="card-title">${food[0].strMeal}</h3>
        <hr>
        <h5>Ingredients</h5>
        <hr>
    `;
    div.innerHTML = heading;
    foodDetailsDiv.appendChild(div);
    
    // Listing Ingredients of the selected Food
    ingredients.forEach(foodIngredients => {
        if(foodIngredients.length > 2  && foodIngredients !== "null null"){
            const p = document.createElement("p");
            p.className = "list-group-item"
            p.innerHTML = `<i class="fas fa-check-square" style="color:#F06C4E;"></i> ${foodIngredients}`;
            foodDetailsDiv.appendChild(p); 
        }
    });
}



