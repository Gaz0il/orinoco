async function listfurniture() {
  const getdata = new Furnitures();
  return await getdata.getAllFurnitures();
}

async function cardBuilderIndex() {
  const dataFurnitures = await listfurniture();
  var containerParent = document.getElementById("listFunriture");

  if (dataFurnitures != undefined) {
    for (let i = 0; i < dataFurnitures.length; i++) {
      const card = document.createElement("div");
      card.className = "furnitureCard";
      card.id = dataFurnitures[i]._id;
      card.style = "width: 18rem";

      const imageFurniture = document.createElement("img");
      imageFurniture.className = "card-img-top";
      imageFurniture.alt = dataFurnitures[i].name;
      imageFurniture.src = dataFurnitures[i].imageUrl;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const titleFurniture = document.createElement("h5");
      titleFurniture.className = "card-title";
      titleFurniture.innerHTML = dataFurnitures[i].name;

      const descriptionFurniture = document.createElement("p");
      descriptionFurniture.className = "card-text";
      descriptionFurniture.innerHTML = dataFurnitures[i].description;

      const buttonDetail = document.createElement("a");
      buttonDetail.className = "btn btn-dark";
      buttonDetail.innerHTML = "Détails";
      buttonDetail.href = "produit.html?id=" + card.id;

      const buttonCart = document.createElement("a");
      buttonCart.className = "btn btn-light";
      buttonCart.innerHTML = "Ajouter panier";
      buttonCart.href = "";

      containerParent.appendChild(card);
      card.appendChild(imageFurniture);
      card.appendChild(cardBody);
      cardBody.appendChild(titleFurniture);
      cardBody.appendChild(descriptionFurniture);
      cardBody.appendChild(buttonDetail);
      cardBody.appendChild(buttonCart);
      console.log(buttonCart, buttonDetail);
    }
  } else {
    const noNetwork = document.createElement("div");
    noNetwork.id = "nonetwork";
    containerParent.appendChild(noNetwork);
    const img = document.createElement("img");
    img.src = "./image/nonetwork.png";
    noNetwork.appendChild(img);
    img.className = "img-fluid";
    img.alt = "noNetwork";
  }
}
cardBuilderIndex();
