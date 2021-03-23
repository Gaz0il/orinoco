/**
 * Build content of panier.html and update item counter of the basket.
 * */ async function basketbuilder() {
  const basket = JSON.parse(localStorage.getItem("basket"));

  const containerParent = document.getElementById("card-container");

  basket.map((item) => {
    const myPromise = new Promise(async function () {
      const getdata = new Furnitures();
      const t = await getdata.getFunrituresById(item.id);

      const cardbasket = document.createElement("div");
      cardbasket.className = "card";
      const cardbody = document.createElement("div");
      cardbody.className = "card-body";
      cardbasket.appendChild(cardbody);
      const nameProduit = document.createElement("h5");
      nameProduit.className = "card-title";
      nameProduit.innerHTML = t.name;
      cardbody.appendChild(nameProduit);
      const descProduit = document.createElement("p");
      descProduit.className = "card-text";
      descProduit.innerHTML = "Description: " + t.description;
      cardbody.appendChild(descProduit);
      containerParent.appendChild(cardbasket);

      const listGroup = document.createElement("ul");
      listGroup.className = "list-group list-group-flush";
      cardbasket.appendChild(listGroup);
      const listGroupVernis = document.createElement("li");
      listGroupVernis.className = "list-group-item";
      listGroupVernis.innerHTML = "Finition : " + item.color;
      const price = document.createElement("li");
      price.className = "list-group-item";
      price.innerHTML =
        "Prix du lot: " +
        (await forgePriceBasket(item.id, parseInt(item.quantity))) +
        " €";

      const listGroupQt = document.createElement("li");
      listGroupQt.className = "list-group-item";
      listGroupQt.innerHTML = "Quantité: " + parseInt(item.quantity);
      listGroup.appendChild(listGroupVernis);
      listGroup.appendChild(listGroupQt);
      listGroup.appendChild(price);

      const cardbodyAdDel = document.createElement("div");
      cardbodyAdDel.className = "card-body";
      cardbasket.appendChild(cardbodyAdDel);

      const del = document.createElement("button");
      del.className = "btn btn-danger";
      del.type = "button";
      del.innerHTML = "Supprimer -  ";
      del.addEventListener(
        "click",
        delProdBasket.bind(null, item.id, item.color),
        false
      );

      cardbodyAdDel.appendChild(del);
    });
  });
  document.getElementById("totalBasket").innerHTML = await totalBasket();
  notification();
}
basketbuilder();

/**
 * hide form if localstorage is empty
 */

function hideForm() {
  JSON.parse(localStorage.getItem("basket")) == null
    ? (document.getElementById("formulaire").hidden = true)
    : (document.getElementById("formulaire").hidden = false);
  document.getElementById("card-container").innerHTML = "Panier Vide";
}

/**
 * Delete the product on the localstorage.
 * @param id String of productId
 * @param color String of product's color
 */

function delProdBasket(id, color) {
  const basket = JSON.parse(localStorage.getItem("basket"));

  const newbasket = basket.filter(
    (element) => !(element.id === id && element.color === color)
  );

  localStorage.setItem("basket", JSON.stringify(newbasket));
  window.location.reload();
}
/**
 * Calculate the total from productId and his quantity
 * @param  id String of productId
 * @param  q Integer of quantity
 * @returns Interger
 */
async function forgePriceBasket(id, q) {
  async function getDetailById(t) {
    const getdata = new Furnitures();
    return await getdata.getFunrituresById(t);
  }
  const detailProduct = await getDetailById(id);
  const b = (detailProduct.price / 100) * q;

  return b;
}
/**
 * Loop of forgePriceBasket() to get the amount of basket
 * @returns Integer of total price of the localstorage "basket"
 */
async function totalBasket() {
  var total = 0;
  const basket = JSON.parse(localStorage.getItem("basket"));
  for (let index = 0; index < basket.length; index++) {
    total =
      total +
      (await forgePriceBasket(
        basket[index].id,
        parseInt(basket[index].quantity)
      ));
  }

  return total;
}
hideForm();
notification();
