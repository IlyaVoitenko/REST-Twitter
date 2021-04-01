let selectLink = document.querySelectorAll('.liSelect')
let containerNews = document.querySelector('#containerNews')
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
   fetch('https://jsonplaceholder.typicode.com/users')
   .then(dataUsers => dataUsers.json())
   .then(dataUsers =>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(dataPosts => dataPosts.json())
        .then(dataPosts => {
            console.log({dataUsers});
            console.log({dataPosts});
       dataUsers.forEach(user => {
        containerNews.innerHTML+=`
        <p></p>
        <div class ="divInfo">
        <p class="name">${user.name} ${user.username}  </p>`
        dataPosts.forEach(post => {
           if (user.id == post.userId) {
            containerNews.innerHTML+=`
            <div class="divInfo">
            ${post.title}
            </div>
            `
           }
        });
        containerNews.innerHTML+=`</div>`
        })
    //    console.log({dataUsers});
    //    dataUsers.forEach(i => {
    //     containerNews.innerHTML+=`
    //     <div class ="divInfo">
    //     <p>${i.name} ${i.username}</p>`
        
    //     containerNews.innerHTML+=`</div>`
       // <div class='containerTitle'></div>
        
        
       });
   })