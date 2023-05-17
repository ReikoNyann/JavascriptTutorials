const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const memePreview = document.querySelector(".meme-generator .meme-preview");

const updateDetails = (url, title, author, ups) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = author;
    memePreview.innerHTML = ups;
}

const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then(response => response.json())
        .then(data =>{
            updateDetails(data.url, data.title, data.author, data.ups);
        });
};

generateMemeBtn.addEventListener("click", generateMeme);
