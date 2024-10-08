function getTimeString(time) {
    //get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
  }
  
  const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("abc");
    for (let btn of buttons) {
      btn.classList.remove("active");
      btn.classList.add("category-btn")
    }
  };
  
  // 1 - Fetch, Load and Show Categories on HTML
  const loadCategories = () => {
    // Fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories Data: ", data); // Debugging
        displayCategories(data.categories);
      })
      .catch((error) => console.log(error));
  };
  
  // Load videos by search text (default shows all)
  const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Videos Data: ", data); // Debugging
        displayVideos(data.videos);
      })
      .catch((error) => console.log(error));
  };
  
  // Load videos for a specific category
  const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Category Videos Data: ", data); // Debugging
        removeActiveClass();
  
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.remove("category-btn")
        activeBtn.classList.add("active");
  
        displayVideos(data.category);
      })
      .catch((error) => console.log(error));
  };
  
  // Load all videos when "All Videos" category is clicked
  const loadAllVideos = () => {
    removeActiveClass();
    const allVideosBtn = document.getElementById("btn-all");
    allVideosBtn.classList.add("active");
    allVideosBtn.classList.remove("category-btn")
    loadVideos();
  };
  
  // Fetch and display video details
  const loadDetails = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };
  
  // Display video details in a modal
  const displayDetails = (video) => {
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `
      <img src=${video.thumbnail} />
      <p>${video.description}</p>
    `;
  
    document.getElementById("customModal").showModal();
  };
  
  // Display videos on the page
  const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
  
    if (videos.length == 0) {
      videoContainer.classList.remove("grid");
      videoContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="asset/Icon.png" /> 
        <h2 class="text-center text-xl font-bold"> No Content Here in this Category </h2> 
      </div>`;
    } else {
      videoContainer.classList.add("grid");
    }
  
    videos.forEach((video) => {
      const card = document.createElement("div");
      card.classList = "card card-compact ";
      card.innerHTML = `
        <figure class="h-[200px] relative">
          <img src=${video.thumbnail} class="h-full w-full object-cover" alt="Video Thumbnail" />
          ${
            video.others?.posted_date
              ? `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(
                  video.others.posted_date
                )}</span>`
              : ""
          }
        </figure>
        <div class="px-0 py-2 flex gap-2">
          <div>
              <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
          </div>
          <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
              <p>${video.authors[0].profile_name}</p>
              ${
                video.authors[0].verified
                  ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
                  : ""
              }
            </div>
            <p class="text-gray-400 text-xs mb-2">${video.others.views} Views</p>
            <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
          </div>
        </div>
      `;
      videoContainer.append(card);
    });
  };
  
  // Display categories including "All Videos"
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    // Add "All Videos" button
    const allVideosButton = document.createElement("div");
    allVideosButton.innerHTML = `
      <button id="btn-all" onclick="loadAllVideos()" class="abc active">
       All Videos
      </button>
    `;
    categoryContainer.append(allVideosButton);
  
    categories.forEach((item) => {
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="category-btn abc">
         ${item.category}
        </button>
      `;
      categoryContainer.append(buttonContainer);
    });
  };
  
  // Event listener for search input to filter videos by title
  document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
  });
  
  // Initial load of categories and all videos
  loadCategories();
  loadVideos();