const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const memeUps = document.querySelector(".meme-generator .meme-ups");


//function to update details for image, title, author and upvotes
const updateDetails = (url, title, author, ups) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = author;
    memeUps.innerHTML = ups;
}

//function to run generateMeme
const generateMeme = () => {
    //fetch to get from api src
    fetch("https://meme-api.com/gimme/wholesomememes")
        //convert data to objects
        .then(response => response.json())
        .then(data =>{
            //according to API data, url, title, author and upvotes
            updateDetails(data.url, data.title, data.author, data.ups);
        });
};

//when button for generate meme is clicked to run generateMeme function
generateMemeBtn.addEventListener("click", generateMeme);
