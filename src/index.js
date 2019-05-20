// document.addEventListener('DOMContent-Loaded', (event => {

let dogBarDiv = document.querySelector('#dog-bar')
let dogContainer = document.querySelector('#dog-info')
console.log(dogBarDiv)



fetch('http://localhost:3000/pups')
.then(res => res.json())
.then(dogs => {
  dogs.forEach(dog => {
    // dogBarDiv.inerHTML += makeDogBarHtml(dog)
    makeDogBarHtml(dog)
    console.log(dog.name)
  })
})


const makeDogBarHtml = (dog) => {
  return dogBarDiv.innerHTML += `<span class="dog-bar-item" id="dog" data-id="${dog.id}">${dog.name}</span>`
}

const makeDogInfo = (dog) => {
  if (dog.isGoodDog === true) {
  dogContainer.innerHTML = `<img src="${dog.image}">
  <h2>${dog.name}</h2>
  <button>Good Dog!</button>`
  }
  else if (dog.isGoodDog === false) {
    dogContainer.innerHTML = `<img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button>Bad Dog!</button>`
  }
}


dogBarDiv.addEventListener('click', (event) => {
  if (event.target.id === 'dog') {
    let dogId = event.target.dataset.id
    console.log('You clicked a dog')
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dog => {
      makeDogInfo(dog)
      dogContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          if (event.target.innerText === 'Good Dog!') {
            event.target.innerText = 'Bad Dog!'
            console.log('This is a good dog')
            fetch(`http://localhost:3000/pups/${dogId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
                // 'Accept': 'application/json',
              },
              body: JSON.stringify({
                isGoodDog: false
              })
            })
          }
          else if (event.target.innerText === 'Bad Dog!') {
            console.log('This is a bad dog')
            event.target.innerText = 'Good Dog!'
            fetch(`http://localhost:3000/pups/${dogId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
                // 'Accept': 'application/json',
              },
              body: JSON.stringify({
                isGoodDog: true
              })
            })
          }
        }
      })
    })
    // .then(makeDogInfo(res))

    // .then(debugger)
    // makeDogBarHtml(dog)
  }
})
