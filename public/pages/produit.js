const params = new URLSearchParams(window.location.search);
let meubleId = params.get("id");

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
  var quantity = document.getElementById("inputValue").value;
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
      let buildoption = document.createElement("option");
      selectId("inputState").appendChild(buildoption);
      buildoption.innerHTML = detailProduct.varnish[index];
      buildoption.setAttribute = detailProduct.varnish[index];
    }
    forgePrice(detailProduct.price);
    console.log("Payload ok");
  } catch (error) {
    selectId("idProduit").innerHTML = "Out of stock";
    selectId("description").innerHTML = "Out of stock";
    selectId("imgDetail").src = "/./image/outofstock.png";
    console.log("erreur: " + error);
  }
}

productBuilder();
