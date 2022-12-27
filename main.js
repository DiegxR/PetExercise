

const pets = JSON.parse(localStorage.getItem('pets')) || [];

 

const mainContainer = document.getElementById('main__container');

const btnNew = document.getElementById('btnNew');

const form = document.getElementById('form');

const renderCards = (filter) => {
    mainContainer.innerHTML = ''
    filter.forEach((pet, index) => {
        mainContainer.innerHTML += `
        <article class="card">
            <figure>
                <button class="${index}" id="delete">x</button>
                <img src="${pet.image}" alt="Perro" class="card__image">
            </figure>
            <div class="card__body">
                <p class="card__title">Nombre: <span class="card__name">${pet.name}</span></p>
                <p class="card__title">Edad: <span class="card__name">${pet.age}</span></p>
                <p class="card__title">Raza: <span class="card__name">${pet.breed}</span></p>
                <p class="card__title">Vacunas: <span class="card__status ${pet.vaccines ? 'success' : 'danger'}">${pet.vaccines ? 'Al día' : 'Pendiente'}</span></p>
            </div>
        </article>
        `;
    });
}

renderCards(pets);

//Events
const handleNew = () => {
    form.classList.toggle('hidden');
}

btnNew.addEventListener('click', handleNew);

const nombre = document.getElementById('name');
const edad = document.getElementById('age');
const raza = document.getElementById('breed');
const imagen = document.getElementById('image');
const vacunas = document.getElementsByName('vaccines')

const handleSubmit = (event) => {
    event.preventDefault();
    const newPet = {
        name : nombre.value,
        age : edad.value,
        breed : raza.value,
        image : imagen.value,
        vaccines :  vacunas[0].checked
    }
    pets.push(newPet);
    localStorage.setItem('pets', JSON.stringify(pets))
    renderCards(pets);
    form.reset();
    form.classList.add('hidden');
}


form.addEventListener('submit', (event) => {
    handleSubmit(event)
})

const handleDelete = (e) => {
    const num = e.path[0].className ;
    confirm(`¿Desea eliminar a ${pets[num].name} de la lista?`) ?
    pets.splice(num, 1)
     : null;
     localStorage.setItem('pets', JSON.stringify(pets));
     renderCards(pets);
}

mainContainer.addEventListener('click', (e)=>{
    e.path[0].id == 'delete' ? handleDelete(e) : null;
})

var filter = document.getElementById('filters');

const handleFilter = (filter) =>{
    console.log(filter)
    switch(filter) {
        case "0":
            renderCards(pets)
            break;
        case "1":
            const withVaccines = pets.filter(pet => pet.vaccines == true)
            renderCards(withVaccines)
            break;
        case "2":
            const withoutVaccines = pets.filter(pet => pet.vaccines == false)
            renderCards(withoutVaccines)
            break;
    }
}
filter.addEventListener('change', () => handleFilter(filter.value) )

