let foods = document.querySelectorAll("#foods li");
let drinks = document.querySelectorAll("#drinks li");
let desserts = document.querySelectorAll("#desserts li");

let finishSelectionButton = document.getElementById("finishSelectionButton");

const orderButton = document.getElementById("order");
const cancelSelectionButton = document.getElementById("cancel");

const deliveryDivTitle = document.getElementById("deliveryTitle");

let cover = document.querySelector(".cover");
let orderDiv = document.querySelector(".delivery");

let selectedFood = null;
let selectedDrink = null;
let selectedDessert = null;
let totalPrice = null;
let clientData = null;



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


function handleMenuClick(itemType, itemHtmlElement){

    const itemNameHolder = itemHtmlElement.querySelector("strong");
    const itemPriceHolder = itemHtmlElement.querySelector("p:nth-child(3)");

    const itemData =  {
        name: itemNameHolder.textContent,
        price: itemPriceHolder.textContent
    } 

    const thisItem = {itemHtmlElement, itemData};

    const selectionIcon = itemHtmlElement.querySelector("ion-icon");
    selectionIcon.classList.remove("ocult");

    itemHtmlElement.classList.add("selected");

    performSelectionChanges( itemType, thisItem);
    
}

function performSelectionChanges(itemType, selectedItem){

    const {itemHtmlElement: htmlElement, itemData: data} = selectedItem;
    
    switch (itemType){
        case "food":
            if(selectedFood !== null){
                let lastSelectedfood = selectedFood.htmlElement;
                lastSelectedfood.classList.remove("selected");
 
                let lastSelectionIcon = lastSelectedfood.querySelector("ion-icon");
                lastSelectionIcon.classList.add("ocult");
                
            }
            selectedFood = {htmlElement, data};
            break;
        case "drink":
            if(selectedDrink !== null){
                let lastSelectedDrink = selectedDrink.htmlElement;
                lastSelectedDrink.classList.remove("selected");
 
                let lastSelectionIcon = lastSelectedDrink.querySelector("ion-icon");
                lastSelectionIcon.classList.add("ocult");
 
            }
            selectedDrink = {htmlElement, data};
            break;
        case "dessert":
            if(selectedDessert !== null){
                let lastSelectedDessert = selectedDessert.htmlElement;
                lastSelectedDessert.classList.remove("selected");
 
                let lastSelectionIcon = lastSelectedDessert.querySelector("ion-icon");
                lastSelectionIcon.classList.add("ocult");
 
            }
            selectedDessert =  {htmlElement, data};
            break;
 
        default:
            console.exception("Error at checkforSectedItem function");

    }

    trySelectionButtonUpdate();
}

function trySelectionButtonUpdate(){
    const isFoodSelected = selectedFood !== null;
    const isDrinkSelected = selectedDrink !== null;
    const isDessertSelected = selectedDessert !== null;
    
    if(isFoodSelected && isDrinkSelected && isDessertSelected){
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