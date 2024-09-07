const Posts_container = document.querySelector(".posts_container");
const Users_container = document.querySelector(".users_container");
const menu = document.getElementById("menu");
const mark = document.getElementById("mark");
menu.onclick = () => (Users_container.style.left = "0", mark.style.display = "block");
mark.onclick = () => (Users_container.style.left = "-100%", mark.style.display = "none");
// get users and their email from API
const GetUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {if(response.ok) return response.json()})
    .then((users) => {
      users.forEach((user) => {
        if (user.id <= 7) {
          let content = `
            <div id="user" onclick="GetPosts(${user.id},this)">
              <h1>${user.name}</h1>                
              <p>${user.email}</p>                
            </div>
          `;
          Users_container.innerHTML += content;
        }
      });
    });
};
GetUsers();
// get posts of the users from API if you click the user
const GetPosts = (userId, el) => {
  const Users = document.querySelectorAll("#user");
  Users.forEach((user) => user.classList.remove("active"));
  el.classList.add("active");
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {if(response.ok) return response.json()})
    .then((posts) => {
      Posts_container.innerHTML = ``;
      posts.forEach((post) => {
        let content = `
          <div id="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
          </div>
        `;
        Posts_container.innerHTML += content;
      });
    });
};
