// This Function displays the food name and image when searched 
const showFoodList = foods => {
    const listDiv = document.getElementById("foodList");
    listDiv.className = "row"
    listDiv.innerHTML = "";
    foods.forEach(food => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "col-md-3 col-sm-6 mb-5";

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
        .then(data => renderFoodInfo(data.meals[0]));

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
    
    // Retrieving the image for showing details 
    const img = document.createElement("img");
    img.setAttribute("src", `${food.strMealThumb}`);
    foodDetailsDiv.appendChild(img);

    // creating a div for showing the food name in ingredients list
    const div = document.createElement("div");
    const heading = `
        <h3 class="card-title">${food.strMeal}</h3>
        <hr>
        <h5>Ingredients</h5>
        <hr>
    `;
    div.innerHTML = heading;
    foodDetailsDiv.appendChild(div);
    
    // Listing Ingredients of the selected Food
    for(let i=1;i<=20;i++) {
        const content = `${food[`${`strMeasure${i}`}`]} ${food[`${`strIngredient${i}`}`]}`;
        // const value = `${meal[`${`strMeasure${i}`}`]} ${meal[`${`strIngredient${i}`}`]}`;
        if(content.length > 2  && content !== "null null"){
            const p = document.createElement("p");
            p.className = "list-group-item"
            p.innerHTML = `<i class="fas fa-check-square" style="color:#F06C4E;"></i> ${content}`;
            foodDetailsDiv.appendChild(p); 
        }
    }
}



