//Create Categories
const loadCategories =() =>{
    fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//Create Display Categories
const displayCategories =(categories) =>{
    const categoryContainer = document.getElementById("categories");
    //add all video button
    const allVideoButton =document.createElement("div");
    allVideoButton.innerHTML = `
    <button id="btn-all" onclick="loadVideoes()" class="btn">All Video</button>
    `;
    categoryContainer.append(allVideoButton);
    categories.forEach((item) => {
        //Create Button
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        //add button to category container
        categoryContainer.append(button);
    });
};
loadCategories();