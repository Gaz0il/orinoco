const panierStorage = {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  colors: { type: String, required: true },
  quantity: { type: Number, required: true },
};
const allBasket = [];

function addItemInAllBasket(item) {
  allBasket.push(item);
}
function removeItem(item) {
  allBasket.filter(function (byname) {
    return byname.name != item;
  });
}

/*<div class="card" style="width: 18rem">
<div class="card-body">
  <h5 class="card-title">Nom Produit</h5>
  <p class="card-text">descriptif du produit loreum ipsod dzih</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">Vernis</li>
  <li class="list-group-item">Quantité</li>
</ul>
<div class="card-body">
  <a href="#" class="card-link">Supprimer</a>
</div>
</div>*/

/************gestion du panier***************/

/* init basketAll in local storage */
function initBasket() {
  window.localStorage.setItem("basket", allBasket);
}
initBasket();
function setBasket() {
  panierStorage.name = "test";
}
setBasket();
console.log(window.localStorage.getItem("basket"));
/* add/remove product in basket */
/* update badge basket */
/* update quantity if basket same item with same colors */
/* init sum up of each element in panierStorage */
