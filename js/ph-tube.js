function timeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ago`
};
const removeClass = () => {
    const buttons = document.getElementsByClassName('category-button');
    for (let button of buttons) {
        button.classList.remove('active')
    }
}
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCatagories(data.categories))
        .catch((error) => console.log(error))
};
const loadVideos = (searchInput = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log('manger nati',error))
}
const showCategoriesVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const buttons = document.getElementById(`cat-btn${id}`);
            removeClass();
            buttons.classList.add('active');
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))

};
const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const response = await fetch(url);
    const data = await response.json();
    showDetails(data.video);


}
const showDetails = (video) => {
const detailContainer = document.getElementById('modal-content');
detailContainer.innerHTML = `
<img src="${video.thumbnail}" />
<p class="text-gray-400">${video.description}</p>
`
document.getElementById('customModal').showModal();

}
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-4 h-[300px]">
        <img src="./assets/Icon.png"/>
        <h3 class="text-black text-xl font-bold ">Oops!! Sorry, There is no content here</h3>
        </div>
        `;
    }
    else {
        videoContainer.classList.add('grid')
    }
    const videoItem = videos.forEach((item) => {
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
          
 <figure class="h-[250px] relative">
    <img 
      src="${item.thumbnail}"
      class="h-full w-fill object-cover" alt="Shoes"/>
  </figure>
  <div class="flex items-center space-x-2 py-2 px-0">
   <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}" />
   <h2 class="font-bold">${item.title}</h2>
  </div>
  <div class="flex items-center gap-2">
  <p class="text-gray-400 text-sm">${item.authors[0].profile_name}</p>
  ${item.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
  </div>
  <div class="flex gap-2 py-2">
  <P class="font-bold text-black ">${item.others.views}Views</P
${item?.others?.posted_date.length == 0 ? " " : `<span class="absolute bg-black text-white right-2 bottom-2">${timeString(item?.others?.posted_date)}</span>`}
  </div>
<p><button onclick="loadDetails('${item?.video_id}')" class="btn btn-sm btn-error">Details</button></p>
        `;
        videoContainer.append(card)
    })
}
const displayCatagories = (data) => {
    const categoriContainer = document.getElementById('categories-container');
    const catItem = data.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="cat-btn${item.category_id}" onclick = "showCategoriesVideo(${item.category_id})" class="category-button btn py-2 px-6">${item.category}
        </button>
        `
        categoriContainer.append(buttonContainer);
    })
};
document.getElementById('searchInput').addEventListener('keyup', (iv)=>{
loadVideos(iv.target.value);
});


loadCatagories();
loadVideos();



// {
//     "status": true,
//     "message": "Successfully fetched the video with video id 'aaac'",
//     "video": {
//       "category_id": "1003",
//       "video_id": "aaac",
//       "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//       "title": "Laugh at My Pain",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//           "profile_name": "Kevin Hart",
//           "verified": false
//         }
//       ],
//       "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//       },
//       "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
//     }
//   }