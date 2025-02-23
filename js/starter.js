// functions
async function loadCategoryWiseData(category) {
    const uri = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayAllData(data.data);
}

// Show loader
function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

// Hide loader
function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
}

// adopt functionality
function adoptPet(button) {
    console.log(button);
    // Check if the button is already disabled
    if (button.disabled) return;

    // Create a unique modal for each button
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold">Adoption in progress...</h2>
            <p id="countdownText" class="mt-2 text-center">3 seconds remaining</p>
        </div>
    `;
    document.body.appendChild(modal);

    let seconds = 3;
    const countdownText = modal.querySelector('#countdownText');

    // Start countdown for this specific button
    const countdown = setInterval(() => {
        seconds--;
        countdownText.innerText = `${seconds} seconds remaining`;

        if (seconds <= 0) {
            clearInterval(countdown);
            document.body.removeChild(modal); // Remove modal after countdown
            button.disabled = true; // Disable only the clicked button
            button.classList.add('bg-gray-400', 'cursor-not-allowed');
            button.innerText = 'Adopted';
        }
    }, 1000);
}



// api call
// category load
const loadCategoryData = async () => {
    const uri = 'https://openapi.programming-hero.com/api/peddy/categories';
    const res = await fetch(uri);
    const data = await res.json();
    displayCategory(data.categories);
}

// all data load
const loadAllData = async () => {
    showLoader();
    const uri = 'https://openapi.programming-hero.com/api/peddy/pets';
    const res = await fetch(uri);
    const data = await res.json();
    hideLoader();
    displayAllData(data.pets);
}

// load details by id from api
const loadDetails = async (id) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetailsModal(data.petData);
}



// display on screen
// category display
function displayCategory(data) {
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');
    data.forEach(item => {
        const category = document.createElement('div');
        category.innerHTML =
            `
                <button 
                    onclick="loadCategoryWiseData('${item.category}')" class="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-green-200 text-dark rounded-lg w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-16">
                    <img src="${item.category_icon}" alt="Pet Icon" class="w-8 h-8">
                    <span class="font-bold">${item.category}</span>
                </button>

        `;
        categoryContainer.appendChild(category);
    });
}

// add like 
function addLike(link) {
    const likeContainer = document.getElementById('like-container');

    const likedImg = document.createElement('div');
    likedImg.innerHTML = `
        <img src="${link}" class="w-full h-32 object-cover rounded-lg"/>
    `;
    likeContainer.appendChild(likedImg);

}

// show details modal
function showDetailsModal(details) {
    const detailsModal = document.getElementById('details-content');
    detailsModal.innerHTML = ` 
        <img src="${details.image}" class="w-full object-cover py-5"/>
        <p>${details.pet_details}</p>

    `;


    document.getElementById('detailsModalShow').click();
}

// display all data
function displayAllData(data) {
    // console.log(data);
    const allDataContainer = document.getElementById('all-data-container');
    allDataContainer.innerHTML = '';

    if (data.length === 0) {
        allDataContainer.classList.remove('grid');
        allDataContainer.innerHTML = `<div class="mx-auto justify-center">
            <h1 class="text-center text-xl">No Content Here For Now! <br> Visit Again.</h1>
        </div>`;
        return;
    } else {
        allDataContainer.classList.add('grid');
    }
    data.forEach((item) => {
        const card = document.createElement('div');
        card.classList = 'w-full sm:w-80 md:w-72 lg:w-64 xl:w-60 bg-white rounded-xl border p-4';
        card.innerHTML =
            `
        <img src="${item.image}" alt="Pet Image" class="rounded-xl mb-4">
                        <h2 class="text-xl font-bold">${item.pet_name}</h2>
                        <p class="text-sm text-gray-600">🐾 Breed: ${item.breed}</p>
                        <p class="text-sm text-gray-600">📅 Birth: ${item.date_of_birth}</p>
                        <p class="text-sm text-gray-600">♀️ Gender: ${item.gender}</p>
                        <p class="text-sm text-gray-600">💲 Price: ${item.price}$</p>
                        <div class="flex justify-between mt-4">
                            <button
                                class="rounded-lg text-blue-600 hover:bg-blue-100">
                                 <img src="https://img.icons8.com/?size=64&id=66628&format=png" class="w-10" onclick="addLike('${item.image}')"/>
                            </button>
                            <button 
                                class="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100" 
                                onclick="adoptPet(this)">
                                Adopt
                            </button>

                            
                            <button class="px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100" onclick="loadDetails(${item.petId})">Details</button>
                        </div>
        
        `;
        allDataContainer.appendChild(card);
    });
}



// function call
loadCategoryData();
loadAllData();