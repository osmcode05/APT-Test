let Users_container = document.querySelector('.users_container');
let Posts_container = document.querySelector('.posts_container');
// get users and their email from API
let request = new XMLHttpRequest();
request.open('GET','https://jsonplaceholder.typicode.com/users')
request.responseType = 'json'
request.send()
request.onload = ()=> {
    if ( 200 <= request.status < 300 ) {
        let users = request.response
        users.forEach(user => {
            let content = `
            <div id="user" onclick="GetPosts(${user.id},this)">
              <h1>${user.name}</h1>                
              <p>${user.email}</p>                
            </div>
            `
            Users_container.innerHTML += content
        });
    }
} 
// get posts of the users from API if you click the user
function GetPosts(userId,el) {
    let Users = document.querySelectorAll('#user');
    Users.forEach(user => user.classList.remove('active'));
    el.classList.add('active')
    let request = new XMLHttpRequest();
    request.open('GET',`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)// filter the posts
    request.responseType = 'json'
    request.send()
    request.onload = ()=> {
        if ( 200 <= request.status < 300 ) {
            Posts_container.innerHTML = ``
            let AllPosts = '';
            let posts = request.response
            posts.forEach(post => {
                let content = `
                <div id="post">
                   <h2>${post.title}</h2>
                   <p>${post.body}</p>
                </div>
                `
                AllPosts += content
            });
            Posts_container.innerHTML = AllPosts
        }
    }
}

