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
function editPost(url,inputChangeTitle,inputChangeBody) {
    fetch(url,{
        method:'PATCH',
        body:JSON.stringify({
            "title": inputChangeTitle,
            "body":inputChangeBody
        }),
        headers:{
            'Content-type':"application/json; charset=UTF-8"
        }
    })
}
   const url = 'https://jsonplaceholder.typicode.com/users';
   fetch(url)
   .then(response => response.json())
   .then(json => {

    let dictanceDivs = document.createElement('p')
    
    containerNews.innerHTML+=`<div class = "divConteinerBtnAddPost">`
      let btnAddPost = document.createElement('button')
       btnAddPost.innerHTML='Add post'
       btnAddPost.className = 'btnAddPost'
       containerNews.append(btnAddPost)
    containerNews.innerHTML+=`</div>`
    containerNews.append(dictanceDivs)
      
       json.forEach((item) => {
           let urlPost = `https://jsonplaceholder.typicode.com/posts/${item.id}`
           console.log(urlPost)
           let post = document.createElement('div');
           post.className = 'postDiv'
           post.innerHTML += `
                <ul id="${'id'+item.id}">
                        <li><button type="button" class="btn btn-danger delete" id="${item.id}">Delete</button>  <type="button" class="btn btn-primary editBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="${item.id}">Edit</li>
                        <li> <p class="nameUser">${item.name} <span class="email">${item.email}</span></p></li>
                        <li class="links"><a  href="${item.website}">${item.website}</a></li>
                </ul>
              `
           containerNews.appendChild(post)
           let deleteBtn = document.querySelector(`#${'id'+item.id} .delete`);
           let editBtn = document.querySelector(`#${'id'+item.id} .editBtn`)
           let ul = document.querySelector(`#${'id'+item.id}`);
          
           fetch(urlPost)
               .then(response => response.json())
               .then(json => {
                   let singlePost = document.createElement('p');
                   let inputChangeTitle = document.createElement('textarea')
                   let inputChangeBody = document.createElement('textarea')
                   let titlePost = document.createElement('p');
                   let btnReady= document.createElement('button')
                   btnReady.innerText='Ready'
                   btnReady.className='btn btn-success '
                   inputChangeTitle.className='inputsChange btnReady'
                   inputChangeBody.className='inputsChange '
                   singlePost.className = 'liLeft'
                   singlePost.innerHTML = json.body;
                   titlePost.className = 'liLeft'
                   titlePost.innerHTML = json.title;
                   post.appendChild(titlePost)
                   post.appendChild(singlePost)
                   editBtn.addEventListener('click',()=>{
                    inputChangeTitle.value+=`${json.title}`
                    inputChangeBody.value+=`${json.body}`
                    post.appendChild(inputChangeTitle)
                    post.appendChild(inputChangeBody)
                    post.appendChild(btnReady)
                    post.appendChild(dictanceDivs)
                        btnReady.addEventListener('click',()=>{
                            titlePost.innerHTML = inputChangeTitle.value
                            singlePost.innerHTML = inputChangeBody.value
                            editPost(urlPost,inputChangeTitle.value,inputChangeBody.value)
                            inputChangeTitle.remove()
                            inputChangeBody.remove()
                            btnReady.remove()
                            dictanceDivs.remove()
                        })
                   })
                   deleteBtn.addEventListener('click', ()=> {
                        deletePost(urlPost);
                        ul.remove();
                        singlePost.remove()
                        titlePost.remove()
                     })
            })
       })
       
   })
  
