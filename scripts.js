const loadAllPets = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ``;

    setTimeout(() => {
        displayAllPets(data.pets);
        const loadingSpinner = document.getElementById('loading');

        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
    }, 2000);
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.classList.remove('hidden');
}
const loadAllCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayAllCategory(data.categories);
};
const loadByCategory = async(category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const pet = await response.json();
    
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = "";

    setTimeout(() => {
        displayAllPets(pet.data);
        const loadingSpinner = document.getElementById('loading');

        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
    }, 2000);
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.classList.remove('hidden');
}

const displayAllCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = ''; 

    categories.forEach(category => {
        const btn = document.createElement('div');
        btn.innerHTML = `
            <button 
                onclick="loadByCategory('${category.category}')"
                class="btn w-52 h-20 bg-white text-xl font-bold text-black focus:rounded-full hover:bg-green-100 focus:bg-[rgba(14,122,129,15%)]">
                <img class="w-8" src="${category.category_icon}" alt=""> ${category.category}
            </button>
        `;

        categoryContainer.appendChild(btn);
    });
};


const displayAllPets = async (pets) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = "";

    if(pets.length === 0){
        postContainer.innerHTML = `  
        <div class="text-center bg-orange-100 col-span-4 rounded-lg">
            <h1 class='text-3xl'>No Information</h1>
        </div>`;
        return; 
    }

    pets.forEach(pets => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="shadow-xl border rounded-xl">
                <figure class="px-2 pt-2 w-full h-56">
                    <img
                    src="${pets.image}"
                    alt="Pet Image"
                    class="rounded-xl object-cover w-full h-full" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title text-2xl font-bold truncate">${pets.pet_name ? pets.pet_name : 'Information Unavailable'}</h2>
                    <ul class="flex flex-col">
                    <li><strong>Breed: </strong>${pets.breed ? pets.breed : 'Information Unavailable'}</li>
                    <li><strong>Birth: </strong>${pets.date_of_birth ? pets.date_of_birth : 'Information Unavailable'}</li>
                    <li><strong>Gender: </strong>${pets.gender ? pets.gender : 'Information Unavailable'}</li>
                    <li><strong>Price: </strong>$${pets.price ? pets.price : 'Information Unavailable'}</li>
                    </ul>
                    <hr>
                    <div class="flex gap-2 justify-center">
                    <button onclick="likedPets('${pets.image}')" class="btn text-black bg-white border-base-100 hover:bg-pink-200">
                        <img src="./images/like.png" alt="Like" />
                    </button>

                    <button onclick="handleAdopt(event)" class="btn text-black bg-white border-base-100 hover:bg-pink-200">Adopt</button>
                    <button onclick="showDetail('${pets.petId}')" class="btn text-black bg-white border-base-100 hover:bg-pink-200">Details</button>
                    </div>
                </div>
            </div>
            `;

          postContainer.appendChild(div);
    });


    
}
// working
const showDetail = async(id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await response.json();
    const petData = data.petData;

    const modal = document.createElement('div');
    modal.innerHTML = `
        <dialog id="pet_modal_${petData.petId}" class="modal">
            <div class="modal-box" style="background-color: white;">
                <h3 class="text-2xl font-bold text-center">${petData.pet_name} (${petData.breed ? petData.breed : 'Information Uavailable'})</h3>
                <img class="mx-auto my-4" src="${petData.image}" alt="${petData.pet_name ? petData.pet_name : 'Information Uavailable'}" width="400">
                <p><strong>Category:</strong> ${petData.category}</p>
                <p><strong>Date of Birth:</strong> ${petData.date_of_birth ? petData.date_of_birth : 'Information Uavailable'}</p>
                <p><strong>Gender:</strong> ${petData.gender ? petData.gender : 'Information Uavailable'}</p>
                <p><strong>Vaccinated Status:</strong> ${petData.vaccinated_status ? petData.vaccinated_status : 'Information Uavailable'}</p>
                <p><strong>Price:</strong> $${petData.price ? petData.price : 'Information Uavailable'}</p>
                <hr class="my-4">
                <p class="py-4">${petData.pet_details ? petData.pet_details : 'Information Uavailable'}</p>
                <div class="modal-action">
                    <button id="closeModalButton" class="btn">Close</button>
                </div>
            </div>
        </dialog>
    `;
    document.body.appendChild(modal);

    const dialog = modal.querySelector('dialog');
    dialog.showModal();

    const closeModalButton = document.getElementById('closeModalButton');
    closeModalButton.addEventListener('click', () => {
        dialog.close();
        modal.remove();  
    });
};

//100% working
const likedPets = (pet) => {
    const div = document.createElement('div');
    const likeContainer = document.getElementById('liked-container');
    div.innerHTML = `
        <div class="border rounded-xl">
            <figure class="p-2 w-full h-48">
                <img
                src="${pet}"
                alt="Pet Image"
                class="rounded-xl object-cover w-full h-full" />
            </figure>
          </div>
    `
    console.log('liked');
    likeContainer.append(div);
} 
const sortByPrice = async () => {
    const postContainer = document.getElementById('post-container');
    const petDivs = Array.from(postContainer.children);
    
    const petsData = petDivs.map(div => {
        const priceText = div.querySelector('li:nth-child(4)').textContent;
        const price = Number(priceText.split('$')[1]);
    
        return {
            price: price,
            element: div
        };
    });
    petsData.sort((a, b) => b.price - a.price);
    postContainer.innerHTML = '';

    setTimeout(() => {
        petsData.forEach(pet => {
            postContainer.appendChild(pet.element);
        });
        const loadingSpinner = document.getElementById('loading');

        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
    }, 2000);
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.classList.remove('hidden');
    

};

// working
const handleAdopt = (event) => {
    const adoptButton = event.target;

    const modal = document.createElement('div');
    modal.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box" style="background-color: white;">
                <h3 class="text-2xl font-bold text-center">Thank You for Adopting!</h3>
                <span class="countdown flex justify-center p-10">
                    <span id="countdown" style="--value: 3;"></span>
                </span>
            </div>
        </dialog>
    `;
    
    document.body.appendChild(modal);

    const dialog = modal.querySelector('dialog');
    dialog.showModal();

    let timeLeft = 3;
    const countdownElement = modal.querySelector('#countdown');

    const countdownTimer = setInterval(() => {
        timeLeft--;
        countdownElement.style.setProperty('--value', timeLeft);

        if (timeLeft === 0) {
            clearInterval(countdownTimer); 
            dialog.close();
            modal.remove();
            adoptButton.disabled = true;  
        }
    }, 1000);  
};





loadAllPets();
loadAllCategory();
