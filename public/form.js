function formDel() {
  JSON.parse(localStorage.getItem("basket")) == (Object.length = 0)
    ? (document.getElementById("formulaire").style.visibility = "hidden")
    : (document.getElementById("formulaire").style.visibility = "visible");
}
formDel();
/*...................Post funct...................*/
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

/****************create local storage confirmation data****************/

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

/*.................eventPostForm...........................*/
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