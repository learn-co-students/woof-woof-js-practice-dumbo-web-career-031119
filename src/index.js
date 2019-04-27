const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info');
const dogFilter = document.getElementById('good-dog-filter');
let filtering = false;

const loadDogs = () => {
    fetch('http://localhost:3000/pups')
        .then(stuff => stuff.json())
        .then(jsonstuff => {
            jsonstuff.forEach(doggo => {
                if (!filtering || doggo.isGoodDog) {
                    addPupsToBar(doggo)
                }
            });
        })
}

loadDogs()

const loadOneDog = (dogID) => {
    fetch(`http://localhost:3000/pups/${dogID}`)
        .then(stuff => stuff.json())
        .then(doggo => {
            addPupToPage(doggo)
        })
}

const patchGoodNess = (dogID, newGoodNess) => {

    fetch(`http://localhost:3000/pups/${dogID}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: newGoodNess
        })
    })
}

const addPupsToBar = (pup) => {
    dogBar.innerHTML += `<span data-set-id=${pup.id} >${pup.name}</span>`
};

const goodOrBad = (goodNess) => {
    if (goodNess) {
        return 'Good Dog!'
    } else {
        return 'Bad Dog!'
    }
}

const addPupToPage = pup => {
    dogInfo.innerHTML = `<img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button data-id=${pup.id} data-good=${pup.isGoodDog} >${goodOrBad(pup.isGoodDog)}</button>`
}

const displayDoggo = (pupEvent) => {
    if (pupEvent.target.localName == 'span') {
        loadOneDog(pupEvent.target.dataset.setId)
    }
}

const toggleGoodness = goodNess => {
    let newGoodOrBad = true
    if (goodNess.target.dataset.good == 'true') {
        newGoodOrBad = false
    }

    patchGoodNess(goodNess.target.dataset.id, newGoodOrBad)
    goodNess.target.dataset.good = newGoodOrBad
    goodNess.target.innerHTML = goodOrBad(newGoodOrBad)
}

const filterWoofers = () => {
    filtering = !filtering
    dogBar.innerHTML = ''

    if (filtering) {
        dogFilter.innerHTML = 'Filter good dogs: ON'
    } else {
        dogFilter.innerHTML = 'Filter good dogs: OFF'
    }

    loadDogs()
}

dogBar.addEventListener('click', displayDoggo)
dogInfo.addEventListener('click', toggleGoodness)
dogFilter.addEventListener('click', filterWoofers)