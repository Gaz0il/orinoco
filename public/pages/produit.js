const params = new URLSearchParams(window.location.search);
const meubleId = params.get("id");

async function getDetailById(id) {
  const getdata = new Furnitures();
  return await getdata.getFunrituresById(id);
}

function selectId(id) {
  const select = document.getElementById(id);
  return select;
}
async function forgePrice() {
  const detailProduct = await getDetailById(meubleId);
  const quantity = document.getElementById("inputValue").value;
  selectId("prix").innerHTML =
    "Prix du lot : " + (detailProduct.price / 100) * quantity + " €";
}

async function productBuilder() {
  const detailProduct = await getDetailById(meubleId);
  try {
    selectId("idProduit").innerHTML = detailProduct.name;
    selectId("description").innerHTML = detailProduct.description;
    selectId("imgDetail").src = detailProduct.imageUrl;
    for (let index = 0; index < detailProduct.varnish.length; index++) {
      const buildoption = document.createElement("option");

      selectId("inputState").appendChild(buildoption);
      selectId("inputState").value = detailProduct.varnish[index];
      buildoption.innerHTML = detailProduct.varnish[index];
      buildoption.setAttribute = detailProduct.varnish[index];
    }
    document.getElementById("inputState").selectedIndex = 0;
    forgePrice(detailProduct.price);
    console.log("Payload ok");
  } catch (error) {
    selectId("idProduit").innerHTML = "Out of stock";
    selectId("description").innerHTML = "Out of stock";
    selectId("imgDetail").src = "/./image/outofstock.png";
    console.log("erreur: " + error);
  }

  notification();
}

productBuilder();

function addBasket() {
  const basket =
    localStorage.getItem("basket") !== null
      ? JSON.parse(localStorage.getItem("basket"))
      : [];

  const itemStore = {
    id: meubleId,
    color: selectId("inputState").value,
    quantity: selectId("inputValue").value,
  };
  if (
    basket.some(
      (element) =>
        element.id === itemStore.id && element.color === itemStore.color
    )
  ) {
    const filter = basket.find(
      (i) => i.id === itemStore.id && i.color === itemStore.color
    );
    filter.quantity = parseInt(filter.quantity) + parseInt(itemStore.quantity);
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    basket.push(itemStore);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  notification();
}
