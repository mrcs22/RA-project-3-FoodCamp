let a = document.querySelector(".content");
let AllUnOrderedLists = [a.children[1], a.children[3], a.children[5]];

let finishSelectionButton = document.getElementById("finishSelectionButton");

let cover = document.querySelector(".cover");
let orderDiv = document.querySelector(".delivery");

let selectedFood = [];
let selectedDrink = [];
let selectedDessert = [];

let foods = [...AllUnOrderedLists[0].children];
let drinks = [...AllUnOrderedLists[1].children];
let desserts = [...AllUnOrderedLists[2].children];

start();

function start(){
    finishSelectionButton.disabled = true;
    addEventListeners();

}

function addEventListeners(){

    foods.forEach(food =>{
        food.addEventListener("click", () => {handleMenuClick("food", food)})
    })
    
    drinks.forEach(drink =>{
        drink.addEventListener("click", () => {handleMenuClick("drink", drink)})
    })
    
    desserts.forEach(dessert =>{
        dessert.addEventListener("click", () => {handleMenuClick("dessert", dessert)})
    })
    

    finishSelectionButton.addEventListener("click", renderCheckOrder)
}


function handleMenuClick(itemType, item){
    
    let ItemDescriptionDiv = item.children[1];
    let nameHolder = ItemDescriptionDiv.children[0];
    let priceHolder = ItemDescriptionDiv.children[2];

    
    let itemInformation =  {
        name: nameHolder.textContent,
        price: priceHolder.textContent
    } 

    let thisItem = [item, itemInformation];

    performItemSelection( itemType, thisItem);


    item.classList.add("selected");
    updateSelectionButton()
}

function   performItemSelection(itemType, newItem){
   switch (itemType){
       case "food":
           if(selectedFood.length > 0){
               let lastSelectedfood = selectedFood[0];
               lastSelectedfood.classList.remove("selected");
               selectedFood = [];
           }
           selectedFood = [...newItem];
           break;
        case "drink":
           if(selectedDrink.length > 0){
               let lastSelectedDrink = selectedDrink[0];
               lastSelectedDrink.classList.remove("selected");
               selectedDrink = [];
           }
           selectedDrink = [...newItem];
           break;
           case "dessert":
           if(selectedDessert.length > 0){
               let lastSelectedDessert = selectedDessert[0];
               lastSelectedDessert.classList.remove("selected");
               selectedDessert = [];
           }
           selectedDessert = [...newItem];
           break;

           default:
               console.exception("Error at checkforSectedItem function");

   }

}

function updateSelectionButton(){
    let counter = selectedFood.length + selectedDrink.length + selectedDessert.length;

    if(counter > 5){
        finishSelectionButton.disabled = false;
        finishSelectionButton.innerHTML = "Fechar pedido";
    }
}

function renderCheckOrder(){
    cover.classList.remove("ocult");
    orderDiv.classList.remove("ocult");

    let foodNameHolder = document.getElementById("foodName");
    let foodPriceHolder = document.getElementById("foodPrice");

    let drinkNameHolder = document.getElementById("drinkName");
    let drinkPriceHolder = document.getElementById("drinkPrice");

    let dessertNameHolder = document.getElementById("dessertName");
    let dessertPriceHolder = document.getElementById("dessertPrice");

    let totalPriceHolder = document.getElementById("TotalPrice");

    foodNameHolder.textContent=selectedFood[1].name;
    foodPriceHolder.textContent = selectedFood[1].price;

    drinkNameHolder.textContent=selectedDrink[1].name;
    drinkPriceHolder.textContent = selectedDrink[1].price;

    dessertNameHolder.textContent=selectedDessert[1].name;
    dessertPriceHolder.textContent = selectedDessert[1].price;

    let totalPrice = calculateTotalPrice();

    totalPriceHolder.textContent =`R$ ${totalPrice}`;

}

function calculateTotalPrice(){
    let foodPrice = selectedFood[1].price.split(" ")[1];
    let drinkPrice = selectedDrink[1].price.split(" ")[1];
    let dessertPrice = selectedDessert[1].price.split(" ")[1];


    foodPrice = foodPrice.replace(",", ".");
    drinkPrice = drinkPrice.replace(",", ".");
    dessertPrice = dessertPrice.replace(",", ".");

    let total = parseFloat(foodPrice) + parseFloat(drinkPrice) + parseFloat(dessertPrice);

    return total.toFixed(2);
}