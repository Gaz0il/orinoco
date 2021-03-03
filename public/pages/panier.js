async function basketbuilder() {
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
      del.setAttribute(
        "onClick",

        "delProdBasket('" + item.color + "," + item.id + "')"
      );
      cardbodyAdDel.appendChild(del);
    });
  });
  document.getElementById("totalBasket").innerHTML = await totalBasket();
  notification();
}

basketbuilder();
/************gestion du panier***************/

function delProdBasket(iden) {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const prodToDel = iden.split(",");
  const colorToDel = prodToDel[0];
  const idToDel = prodToDel[1];

  const newbasket = basket.filter(
    (element) => !(element.id === idToDel && element.color === colorToDel)
  );

  localStorage.setItem("basket", JSON.stringify(newbasket));
  window.location.reload();
  notification();
}
async function forgePriceBasket(id, q) {
  async function getDetailById(t) {
    const getdata = new Furnitures();
    return await getdata.getFunrituresById(t);
  }
  const detailProduct = await getDetailById(id);
  const b = (detailProduct.price / 100) * q;

  return b;
}
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
