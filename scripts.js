const loadAllPets = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
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
    console.log(data.categories);
};
const loadByCategory = async(category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const pet = await response.json();
    displayAllPets(pet.data);

}

const displayAllCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = ''; // Clear previous categories

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
    setTimeout(() => {
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
                        <li>Breed: ${pets.breed ? pets.breed : 'Information Unavailable'}</li>
                        <li>Birth: ${pets.date_of_birth ? pets.date_of_birth : 'Information Unavailable'}</li>
                        <li>Gender: ${pets.gender ? pets.gender : 'Information Unavailable'}</li>
                        <li>Price: $${pets.price ? pets.price : 'Information Unavailable'}</li>
                        </ul>
                        <hr>
                        <div class="flex gap-4 justify-center">
                        <button onclick="likedPets('${pets.image}')" class="btn text-black bg-white border-base-100 hover:bg-pink-200">
                            <img src="./images/like.png" alt="Like" />
                        </button>
                        <button class="btn text-black bg-white border-base-100 hover:bg-pink-200">Adopt</button>
                        <button onclick="showDetail('${pets.id}')" class="btn text-black bg-white border-base-100 hover:bg-pink-200">Details</button>
                        </div>
                    </div>
                </div>
                `;
    
              postContainer.appendChild(div);
        });
    }, 1);


    
}
// puts liked pets on the liked container - 100% working
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
const sortByPrice = () => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ``;

    
        
}

loadAllPets();
loadAllCategory();
