let selectLink = document.querySelectorAll('.liSelect')

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
   