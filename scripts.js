const loadAllPets = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPets(data.pets);
    console.log(data.pets)
}

const displayAllPets = async (pets) => {
    const postContainer = document.getElementById('post-container');
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
      <button class="btn text-black bg-white border-base-100 hover:bg-pink-200">Details</button>
    </div>
  </div>
</div>
`;

          postContainer.appendChild(div);
    });
}
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



const handleReload = () => {
    const container = document.getElementById("post-container");
    const span = document.createElement('span');
    span.innerHTML = `<span class="loading loading-bars loading-md"></span>`
    setTimeout(function (){
        loadAllPets();
    }, 2000)
}
loadAllPets();
