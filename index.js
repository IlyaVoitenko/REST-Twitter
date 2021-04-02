let selectLink = document.querySelectorAll('.liSelect')
let containerNews = document.querySelector('#containerNews')
let editBtn = document.querySelector('.editBtn')
function selectItem(elementList) {
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener("click", function(e) {
                var current = this;
                    for (var j = 0; j < elementList.length; j++) {
                        if (current != elementList[j]) {
                            elementList[j].classList.remove('active');
                        } else if (current.classList.contains('active') === true) {
                            current.classList.remove('active');
                        } else {
                            current.classList.add('active')
                        }
                    }
              });
         };
}
selectItem(selectLink)

function deletePost(url) {
    fetch(url,{
        method:'DELETE'
    })
}
   const url = 'https://jsonplaceholder.typicode.com/users';
   fetch(url)
   .then(response => response.json())
   .then(json => {
       json.forEach((item) => {
           let urlPost = `https://jsonplaceholder.typicode.com/posts/${item.id}`
           console.log(urlPost)
           let post = document.createElement('div');
           post.className = 'postDiv'
           post.innerHTML +=
               `
       <ul id="${'id'+item.id}">
       <li><button type="button" class="btn btn-danger delete" id="${item.id}">Delete</button>  <button type="button" class="btn btn-info editBtn">Edit</button></li>
       <li> <p class="nameUser">${item.name} <span class="email">${item.email}</span></p></li>
       <li class="links"><a  href="${item.website}">${item.website}</a></li>
       </ul>
       `
       containerNews.appendChild(post)
           let deleteBtn = document.querySelector(`#${'id'+item.id} .delete`);
           let ul = document.querySelector(`#${'id'+item.id}`);
          
           fetch(urlPost)
               .then(response => response.json())
               .then(json => {
                   let singlePost = document.createElement('p');
                   singlePost.className = 'liLeft'
                   singlePost.innerHTML = json.body;
                   let titlePost = document.createElement('p');
                   titlePost.className = 'liLeft'
                   titlePost.innerHTML = json.title;
                   post.appendChild(titlePost)
                   post.appendChild(singlePost)
                    deleteBtn.addEventListener('click', (e)=> {
                        deletePost(urlPost);
                        ul.remove();
                        singlePost.remove()
                        titlePost.remove()
                    })
               })
       })
   })
