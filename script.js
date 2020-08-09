const foods = [
	{
		id: 'ravitoto',
		price: 5000,
		title: 'Ravitoto',
		spicy: true,
		vegetarian: false,
	},
	{
		id: 'pasta',
		price: 4000,
		title: 'Pasta',
		spicy: true,
		vegetarian: true,
	},
	{
		id: 'burger',
		price: 5000,
		title: 'Burger',
		spicy: false,
		vegetarian: false,
	},
	{
		id: 'rice',
		price: 2000,
		title: 'Rice and Leaves',
		spicy: false,
		vegetarian: true,
	},
	{
		id: 'mofogasy',
		price: 500,
		title: 'Mofogasy',
		spicy: false,
		vegetarian: false,
	},
];

const foodList =  document.querySelector('.list');
const checkBox = document.querySelectorAll('input');
const spicy = document.querySelector('#spicy');
const vegetarian = document.querySelector('#vegetarian');
const orderList = document.querySelector('.order-list');

// generate the food list
const list = foods.map(food => `<ul class="inline-ul" data-title="${food.title}" data-price="${food.price}" data-id="${food.id}">${food.title}
                                    <li>${food.price}Ar</li>
                                    <li><button class="add-meal">Add</button></li>
                                    </ul>`).join('');
   

// oreder list
const handleOrder = (e) => {
    let orderCount = 0;
    
    if(e.target.matches('.add-meal')) {
        orderCount++;
        const meal = e.target.closest('ul');
        const {id, title, price} = meal.dataset;
        let total = price * orderCount;
        const myHtml = `
        <li>
        <ul class="inline-ul">${title}
        <li>*${orderCount}</li>
        <li>${total}Ar</li>
        </ul>
        </li>
        `;
        orderList.innerHTML += myHtml;
    }
}


// Append the list into food list
foodList.innerHTML = list;

//filter
 const handleCheckbox = (e) => {
    if(spicy.checked === true) {
        const arr = foods.filter(food => food.spicy)
        .map(filtered => `<ul class="inline-ul" data-title="${food.title}" data-price="${food.price}" data-id="${food.id}">${filtered.title}
                                    <li>${filtered.price}Ar</li>
                                    <li><button class="add-meal">Add</button></li>
                                    </ul>`).join('');
                                    foodList.innerHTML = arr;
    }else if(vegetarian.checked === true) {
        const vegetarian = foods.filter(food => food.vegetarian)
        .map(filtered => `    <ul class="inline-ul" data-title="${food.title}" data-price="${food.price}" data-id="${food.id}">${filtered.title}
                                    <li>${filtered.price}Ar</li>
                                    <li><button class="add-meal">Add</button></li>
                                </ul>`).join('');
                                    foodList.innerHTML = vegetarian;
    } else {
        foodList.innerHTML = list;
    }
    
};

//confirm order
const confirmBtn = document.querySelector('.confirm-btn'); 
const outerModal = document.querySelector('.outer-modal');
const innerModal = document.querySelector('.inner-modal');

// open the modal
const openModal = () => {
    outerModal.classList.add('open');
}

// close modal
const closeModal = (e) => {
    const isOutside = !e.target.closest('.inner-modal');
    if (isOutside) {
        console.log('out')
        outerModal.classList.remove('open')
    }
    
}


const handleConfirmBtn = (e) => {
    const confirmHtml = `
    <h4>Thank you!</h4>
    <p>Your order is confirmed.<br>We will prepare your food, and deliver it to you when it's ready</p>
    <p>The total amount is --Ar</p>
    `;
    innerModal.innerHTML = confirmHtml;
    openModal();
}

// add event listener
document.addEventListener('change', handleCheckbox);
document.addEventListener('click', handleOrder);
confirmBtn.addEventListener('click', handleConfirmBtn);
//document.addEventListener('click', closeModal);