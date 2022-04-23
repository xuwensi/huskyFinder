'use strict';

/* create a null posts array */
let posts = [];

/* in small screen, click the hanburger menu and show the dropdown menu, click again to hide it */
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
toggleButton.addEventListener('click', function(){
    navbarLinks.classList.toggle('active');
})

/* in the search bar, filter the post based on the user search input, deleting all of the origional post,
   create new filtered post */
function filterPost(dataArr) {
    document.querySelector(".row").innerHTML = "";
    let searchInput = document.querySelector("#search-input").value.toUpperCase();
    let filtered = [];
    for (let eachPost of dataArr) {
        if (eachPost.title.toUpperCase().includes(searchInput) || eachPost.content.toUpperCase().includes(searchInput)) {
            filtered.push(eachPost);
        }
    }
    renderPost(filtered);
}

// renders a post on the page
function renderPost(postArray) {
    let post = document.querySelector(".posts .row");
    for (let i of postArray) {
        let result = document.createElement("div");
        result.classList = "column index";
        let card = document.createElement("div");
        card.classList = "cards";
        result.appendChild(card);
        let title = document.createElement("h3");
        title.classList = "cardtitle";
        title.textContent = i.title;
        card.appendChild(title);
        let image = document.createElement("img");
        image.classList = "pb-3";
        image.src = i.imageSource;
        image.alt = "User profile image";
        image.cite = i.imageCite;
        card.appendChild(image);
        let content = document.createElement("p");
        content.classList = "cardcontent";
        content.textContent = i.content;
        card.appendChild(content);
        post.appendChild(result);
    }
}

// fetch and display the initial posts
function fetchData(){
    fetch("data/postData.json")
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) {
            posts = data
            renderPost(data);
            renderPostDetail(data);
        })
}

// gets the input data and return a array of data
function getData() {
    let nameData = document.querySelector("#input-name").value;
    let emailData = document.querySelector("#input-email").value;
    let titleData = document.querySelector("#post-title").value;
    let introData = document.querySelector("#post-intro").value;
    let categoryData = document.querySelector("#category").value;
    let groupsizeData = document.querySelector("#group-size").value;
    let descriptionData = document.querySelector("#textarea").value;
    let dataArray = [{ name: nameData, email: emailData, title: titleData, content: introData, category: categoryData, groupsize: groupsizeData, description: descriptionData, imageSource: "./img/default.png", imageCite: "https://stackoverflow.com/questions/49917726/retrieving-default-image-all-url-profile-picture-from-facebook-graph-api" }];
    return dataArray;
}

// cleans up the create post form
function clearInput () {
    document.querySelector("#input-name").value = "";
    document.querySelector("#input-email").value = "";
    document.querySelector("#post-title").value = "";
    document.querySelector("#post-intro").value = "";
    document.querySelector("#textarea").value = "";
}

// switch to the create post page
document.querySelector(".btn.btn-success.create-post-btn").addEventListener("click", function(event){
    event.preventDefault();
    document.querySelector("#mainPage").classList="d-none";
    document.querySelector("#postdetailPage").classList="d-none";
    document.querySelector("#createPostPage").classList="";
})

// display a new post from user to the main page 
document.querySelector("#submitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    let postData = getData();
    posts.push(postData[0]);
    clearInput();
    document.querySelector("#mainPage").classList="";
    document.querySelector("#createPostPage").classList="d-none";
    document.querySelector("#postdetailPage").classList="d-none";
    renderPost(postData);
});

// switch to post detail page
document.querySelector("#postDetailBtn").addEventListener("click", function(event){
    event.preventDefault();
    document.querySelector("#mainPage").classList="d-none";
    document.querySelector("#postdetailPage").classList="";
    document.querySelector("#createPostPage").classList="d-none";
})

/* when click on search button, change to show the filtered content based on search input */
document.querySelector("#searchicon").addEventListener("click", function() {
    filterPost(posts);
})

function renderPostDetail (postArray) {
    let postdetail = document.querySelector("#postdetailPage");
    for (let i of postArray) {
        let result = document.createElement("div");
        result.classList = "post-detail";
        let title = document.createElement("h1");
        title.classList = "posttitle";
        title.textContent = i.title
        result.appendChild(title);
        let postimg = document.createElement("div");
        postimg.classList = "postimg";
        let imgDetail = document.createElement("img");
        imgDetail.classList = "pb-3";
        imgDetail.src = i.imageSource;
        imgDetail.alt = "user profile image";
        imgDetail.cite=i.imageCite;
        postimg.appendChild(imgDetail);
        result.appendChild(postimg);
        let postinfo = document.createElement("section");
        postinfo.classList="postinfo";
        result.appendChild(postinfo);
        let postname = document.createElement("p");
        postname.classList="name";
        postname.textContent="Name: "+i.name;
        postinfo.appendChild(postname);
        let postemail = document.createElement("p");
        postemail.classList="email";
        postemail.textContent="Email: " + i.email;
        postinfo.appendChild(postemail);
        let postcontent = document.createElement("p");
        postcontent.classList="postcontent";
        postcontent.textContent=i.postInfo;
        postinfo.appendChild(postcontent);
        let postmember = document.createElement("p");
        postmember.classList="member";
        postmember.textContent="Member: "+ i.currentSize +"/"+ i.groupSize;
        postinfo.appendChild(postmember)
        result.appendChild(document.createElement("hr"))
        postdetail.appendChild(result)
    }
}

fetchData()

