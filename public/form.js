/** If basket is empty, hide form */
function formDel() {
  JSON.parse(localStorage.getItem("basket")) == (Object.length = 0)
    ? (document.getElementById("formulaire").style.visibility = "hidden")
    : (document.getElementById("formulaire").style.visibility = "visible");
}
formDel();
/** This post return a call to store this orderId from back to the local storage
 * @param contact object.
 * @param products array
 * @param url String of endpoint to post
 * @returns call of storeConfirm() */

function postForm(contact, products, url) {
  const data = {
    contact,
    products,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options).then((response) =>
    response
      .json()
      .then((message) =>
        message.orderId != null && data.products != null
          ? storeConfirm(message.orderId, data)
          : window.alert("Panier vide")
      )
  );
}

/** Create a new localstorage named "confirmation", to save the orderId returned from the post then switch to the confirmation page*/

async function storeConfirm(orderId, data) {
  const price = await totalBasket();
  const dataConf = {
    orderId,
    data,
    price,
  };
  localStorage.setItem("confirmation", JSON.stringify(dataConf));
  window.location.href = "http://localhost:3000/confirmation.html";
}

/** Event to save form in object and call a POST
 * @param event to stop propagation.
 */
function eventPost(event) {
  event.preventDefault();
  const url = `http://localhost:3000/api/furniture/order`;

  firstName = document.getElementById("fname").value;
  lastName = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  address = document.getElementById("adresse").value;
  city = document.getElementById("city").value;

  const contact = {
    firstName,
    lastName,
    address,
    city,
    email,
  };
  const products = [];
  const basket = JSON.parse(localStorage.getItem("basket"));
  basket.forEach((element) => {
    products.push(element.id);
  });

  postForm(contact, products, url);
}
