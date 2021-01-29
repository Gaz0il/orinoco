async function listfurniture() {
  const getdata = new Furnitures();
  return await getdata.getAllFurnitures();
}

/* modele to reproduce
<div class="furnitureCard">
      <div class="card" style="width: 18rem">
                <img
            class="card-img-top"
            src="../images/oak_1.jpg"
            alt="Card image cap"
          />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Détails</a>
          <a href="#" class="btn btn-primary">Ajouter panier</a>
        </div>
      </div>
    </div>
*/

//call function card builder

async function cardBuilderIndex() {
  const dataFurnitures = await listfurniture();
  var containerParent = document.getElementById("listFunriture");
  console.log(dataFurnitures);
  if (dataFurnitures != undefined) {
    for (let i = 0; i < dataFurnitures.length; i++) {
      let card = document.createElement("div");
      card.className = "furnitureCard";
      card.id = dataFurnitures[i]._id;
      card.style = "width: 18rem";

      let imageFurniture = document.createElement("img");
      imageFurniture.className = "card-img-top";
      imageFurniture.alt = dataFurnitures[i].name;
      imageFurniture.src = dataFurnitures[i].imageUrl;

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      let titleFurniture = document.createElement("h5");
      titleFurniture.className = "card-title";
      titleFurniture.innerHTML = dataFurnitures[i].name;

      let descriptionFurniture = document.createElement("p");
      descriptionFurniture.className = "card-text";
      descriptionFurniture.innerHTML = dataFurnitures[i].description;

      let buttonDetail = document.createElement("a");
      buttonDetail.className = "btn btn-primary";
      buttonDetail.innerHTML = "Détails";
      buttonDetail.href = "panier.html?id=" + card.id;

      let buttonCart = document.createElement("a");
      buttonCart.className = "btn btn-primary";
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
    let noNetwork = document.createElement("div");
    noNetwork.id = "nonetwork";
    containerParent.appendChild(noNetwork);
    let img = document.createElement("img");
    img.src = "./image/nonetwork.png";
    noNetwork.appendChild(img);
    img.className = "img-fluid";
    img.alt = "noNetwork";
  }
}
cardBuilderIndex();
