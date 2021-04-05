const foods = document.querySelectorAll("#foods li");
const drinks = document.querySelectorAll("#drinks li");
const desserts = document.querySelectorAll("#desserts li");

const finishSelectionButton = document.getElementById("finishSelectionButton");

const orderButton = document.getElementById("order");
const cancelSelectionButton = document.getElementById("cancel");

const deliveryDivTitle = document.getElementById("deliveryTitle");

const cover = document.querySelector(".cover");
const orderDiv = document.querySelector(".delivery");

let selectedFood = null;
let selectedDrink = null;
let selectedDessert = null;
let totalPrice = null;
const clientData = { name: null, address: null };

start();

function start() {
  finishSelectionButton.disabled = true;
  addEventListeners();
}

function addEventListeners() {
  foods.forEach((food) => {
    food.addEventListener("click", () => {
      handleMenuClick("food", food);
    });
  });

  drinks.forEach((drink) => {
    drink.addEventListener("click", () => {
      handleMenuClick("drink", drink);
    });
  });

  desserts.forEach((dessert) => {
    dessert.addEventListener("click", () => {
      handleMenuClick("dessert", dessert);
    });
  });

  finishSelectionButton.addEventListener("click", renderCheckOrder);

  cancelSelectionButton.addEventListener("click", cancelSelection);

  orderButton.addEventListener("click", handleOrderClick);
}

function handleMenuClick(itemType, itemHtmlElement) {
  const itemNameHolder = itemHtmlElement.querySelector("strong");
  const itemPriceHolder = itemHtmlElement.querySelector("p:nth-child(3)");

  const itemData = {
    name: itemNameHolder.textContent,
    price: itemPriceHolder.textContent,
  };

  const thisItem = { itemHtmlElement, itemData };

  const selectionIcon = itemHtmlElement.querySelector("ion-icon");
  selectionIcon.classList.remove("ocult");

  itemHtmlElement.classList.add("selected");

  performSelectionChanges(itemType, thisItem);
}

function performSelectionChanges(itemType, selectedItem) {
  const { itemHtmlElement: htmlElement, itemData: data } = selectedItem;

  switch (itemType) {
    case "food":
      if (selectedFood !== null) {
        let lastSelectedfood = selectedFood.htmlElement;
        lastSelectedfood.classList.remove("selected");

        let lastSelectionIcon = lastSelectedfood.querySelector("ion-icon");
        lastSelectionIcon.classList.add("ocult");
      }
      selectedFood = { htmlElement, data };
      break;
    case "drink":
      if (selectedDrink !== null) {
        let lastSelectedDrink = selectedDrink.htmlElement;
        lastSelectedDrink.classList.remove("selected");

        let lastSelectionIcon = lastSelectedDrink.querySelector("ion-icon");
        lastSelectionIcon.classList.add("ocult");
      }
      selectedDrink = { htmlElement, data };
      break;
    case "dessert":
      if (selectedDessert !== null) {
        let lastSelectedDessert = selectedDessert.htmlElement;
        lastSelectedDessert.classList.remove("selected");

        let lastSelectionIcon = lastSelectedDessert.querySelector("ion-icon");
        lastSelectionIcon.classList.add("ocult");
      }
      selectedDessert = { htmlElement, data };
      break;

    default:
      console.exception("Error at checkforSectedItem function");
  }

  trySelectionButtonUpdate();
}

function trySelectionButtonUpdate() {
  const isFoodSelected = selectedFood !== null;
  const isDrinkSelected = selectedDrink !== null;
  const isDessertSelected = selectedDessert !== null;

  if (isFoodSelected && isDrinkSelected && isDessertSelected) {
    finishSelectionButton.disabled = false;
    finishSelectionButton.innerHTML = "Fechar pedido";
  }
}

function renderCheckOrder() {
  cover.classList.remove("ocult");
  orderDiv.classList.remove("ocult");

  const foodNameHolder = document.getElementById("foodName");
  const foodPriceHolder = document.getElementById("foodPrice");

  const drinkNameHolder = document.getElementById("drinkName");
  const drinkPriceHolder = document.getElementById("drinkPrice");

  const dessertNameHolder = document.getElementById("dessertName");
  const dessertPriceHolder = document.getElementById("dessertPrice");

  const totalPriceHolder = document.getElementById("TotalPrice");

  foodNameHolder.textContent = selectedFood.data.name;
  foodPriceHolder.textContent = selectedFood.data.price;

  drinkNameHolder.textContent = selectedDrink.data.name;
  drinkPriceHolder.textContent = selectedDrink.data.price;

  dessertNameHolder.textContent = selectedDessert.data.name;
  dessertPriceHolder.textContent = selectedDessert.data.price;

  totalPrice = calculateTotalPrice();

  totalPriceHolder.textContent = `R$ ${totalPrice}`;
}

function calculateTotalPrice() {
  let foodPrice = formatValue(selectedFood.data.price);
  let drinkPrice = formatValue(selectedDrink.data.price);
  let dessertPrice = formatValue(selectedDessert.data.price);

  let total = foodPrice + drinkPrice + dessertPrice;

  return total.toFixed(2);
}

function formatValue(value) {
  value = value.split("$")[1];
  value = value.replace(",", ".");
  return parseFloat(value);
}

function cancelSelection() {
  cover.classList.add("ocult");
  orderDiv.classList.add("ocult");
}

function handleOrderClick() {
  removeDeliveryInfomation();
  renderInputFields(orderDiv);

  orderButton.removeEventListener("click", handleOrderClick);
  orderButton.addEventListener("click", finishOrder);
}

function removeDeliveryInfomation() {
  let orderDivChildren = orderDiv.querySelectorAll("p");
  let cancelStrong = orderDiv.querySelector("strong:last-child");

  orderDivChildren = [...orderDivChildren, cancelStrong];

  orderDivChildren.forEach((child) => {
    orderDiv.removeChild(child);
  });
}

function renderInputFields(div) {
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "nameInput");
  nameLabel.innerHTML = "Nome:";

  const addressLabel = document.createElement("label");
  addressLabel.innerHTML = "Endereço:";
  addressLabel.setAttribute("for", "addressInput");

  const nameInput = document.createElement("input");
  nameInput.setAttribute("id", "nameInput");

  const addressInput = document.createElement("input");
  addressInput.setAttribute("id", "addressInput");

  deliveryDivTitle.textContent = "Estamos quase lá...";

  orderButton.innerHTML = "Concluir";
  orderButton.disabled = true;

  div.removeChild(orderButton);

  div.appendChild(nameLabel);
  div.appendChild(nameInput);
  div.appendChild(addressLabel);
  div.appendChild(addressInput);

  div.appendChild(orderButton);

  checkForInputs(nameInput, addressInput);
}

function checkForInputs(input1, input2) {
  input1.addEventListener("keyup", () => handleInputsChange(input1, input2));
  input2.addEventListener("keyup", () => handleInputsChange(input1, input2));
}

function handleInputsChange(input1, input2) {
  if (input1.value && input2.value) {
    orderButton.disabled = false;

    clientData.name = input1.value;
    clientData.address = input2.value;
  } else {
    orderButton.disabled = true;
  }
}

function finishOrder() {
  let message = `
    Olá, gostaria de fazer o pedido:

    - Prato: ${selectedFood.data.name} 
    - Bebida: ${selectedDrink.data.name}
    - Sobremesa: ${selectedDessert.data.name}
    
    Total: R$ ${totalPrice}

    Nome: ${clientData.name}
    Endereço: ${clientData.address}
    `;

  message = encodeURIComponent(message);

  window.location.href = `https://wa.me/?text=${message}`;
}
