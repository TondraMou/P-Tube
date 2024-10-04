//Create Categories
const loadCategories =() =>{
    fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
//load video
const loadVideos =() =>{
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

//display video
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videos");
    videos.forEach((video) => {
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="h-[200px]">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img src=${video.authors[0].profile_picture} class="w-9 h-9 rounded-full object-cover"/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-3">
    <p>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? `<img src="asset/icons8-verify-40.png" class="w-4 h-4"/>` : ""}
    </div>
    <p>${video.others.views} Views</p>
    </div>
  </div>
        `;
        videoContainer.append(card);
    });
};

//Create Display Categories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories");
    //add all video button
    const allVideoButton =document.createElement("div");
    allVideoButton.innerHTML = `
    <button id="btn-all" onclick="loadVideoes()" class="btn category-btn active">All Video</button>
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
loadVideos();