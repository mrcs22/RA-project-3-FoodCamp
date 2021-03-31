let a = document.querySelector(".content");
let AllUnOrderedLists = [a.children[1], a.children[3], a.children[5]];

let finishSelectionButton = document.getElementById("finishSelectionButton");

const orderButton = document.getElementById("order");
const cancelSelectionButton = document.getElementById("cancel");

const deliveryDivTitle = document.getElementById("deliveryTitle");

let cover = document.querySelector(".cover");
let orderDiv = document.querySelector(".delivery");

let selectedFood = [];
let selectedDrink = [];
let selectedDessert = [];
let totalPrice = null;
let clientName = null;
let clientAddress = null;

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
    });
    
    drinks.forEach(drink =>{
        drink.addEventListener("click", () => {handleMenuClick("drink", drink)})
    });
    
    desserts.forEach(dessert =>{
        dessert.addEventListener("click", () => {handleMenuClick("dessert", dessert)})
    });
    

    finishSelectionButton.addEventListener("click", renderCheckOrder);

    cancelSelectionButton.addEventListener("click", cancelSelection);

    orderButton.addEventListener("click", handleOrderClick);
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
    let selectionIcon = item.children[1].children[2].children[0];

    performItemSelection( itemType, thisItem, selectionIcon);

    item.classList.add("selected");
    selectionIcon.classList.remove("ocult");
    updateSelectionButton()
}

function   performItemSelection(itemType, newItem, selectionIcon){
   switch (itemType){
       case "food":
           if(selectedFood.length > 0){
               let lastSelectedfood = selectedFood[0];
               lastSelectedfood.classList.remove("selected");

               let lastSelectionIcon = lastSelectedfood.children[1].children[2].children[0];
               lastSelectionIcon.classList.add("ocult");
               
               selectedFood = [];
           }
           selectedFood = [...newItem];
           break;
        case "drink":
           if(selectedDrink.length > 0){
               let lastSelectedDrink = selectedDrink[0];
               lastSelectedDrink.classList.remove("selected");

               let lastSelectionIcon = lastSelectedDrink.children[1].children[2].children[0];
               lastSelectionIcon.classList.add("ocult");

               selectedDrink = [];
           }
           selectedDrink = [...newItem];
           break;
           case "dessert":
           if(selectedDessert.length > 0){
               let lastSelectedDessert = selectedDessert[0];
               lastSelectedDessert.classList.remove("selected");

               let lastSelectionIcon = lastSelectedDessert.children[1].children[2].children[0];
               lastSelectionIcon.classList.add("ocult");

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

    totalPrice = calculateTotalPrice();

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

function cancelSelection(){
    cover.classList.add("ocult");
    orderDiv.classList.add("ocult");
}

function handleOrderClick(){
    
    removeDeliveryInfomation();
    renderInputFields(orderDiv);


    orderButton.removeEventListener("click", handleOrderClick);
    orderButton.addEventListener("click", finishOrder);

}

function removeDeliveryInfomation(){
    let orderDivChildren = orderDiv.children; 

    orderDivChildren = [orderDivChildren[1],orderDivChildren[2],orderDivChildren[3],orderDivChildren[4],orderDivChildren[6]];

    orderDivChildren.forEach( child =>{
        orderDiv.removeChild(child);
    })
}



function renderInputFields(div){

    const nameLabel = document.createElement("p");
    nameLabel.innerHTML = "Nome:";
    const addressLabel = document.createElement("p");
    addressLabel.innerHTML = "Endereço:";

    const nameInput = document.createElement("input");
    nameInput.setAttribute("id", "nameInput");
    nameInput.focus;

    const addressInput = document.createElement("input");
    addressInput.setAttribute("id", "addressInput");

    deliveryDivTitle.textContent = "Estamos quase lá...";

    orderButton.innerHTML="Concluir";
    orderButton.disabled = true;


    div.removeChild(orderButton);

    div.appendChild(nameLabel);
    div.appendChild(nameInput);
    div.appendChild(addressLabel);
    div.appendChild(addressInput);

    div.appendChild(orderButton);

    checkForInputs(nameInput, addressInput);
}


function checkForInputs(input1, input2){
    
    input1.addEventListener("keyup", () => handleChange(input1, input2));
    input2.addEventListener("keyup", () => handleChange(input1, input2));
    
}


function handleChange(input1, input2){
    if(input1.value && input2.value){
        orderButton.disabled=false;

        clientName = input1.value;
        clientAddress = input2.value;
    }
    else{
        orderButton.disabled=true;
    }
}


function finishOrder(){

    let message = `
    Olá, gostaria de fazer o pedido:

    - Prato: ${selectedFood[1].name} 

    - Bebida: ${selectedDrink[1].name}

    - Sobremesa: ${selectedDessert[1].name}

    Total: R$ ${totalPrice}

    Nome: ${clientName}
    Endereço: ${clientAddress}
    `
 
    message = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${message}`);
   
}