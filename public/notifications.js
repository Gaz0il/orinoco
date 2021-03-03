function notification() {
  var c = 0;
  const basket = JSON.parse(localStorage.getItem("basket"));
  for (let index = 0; index < basket.length; index++) {
    c = c + parseInt(basket[index].quantity);
  }
  document.getElementById("notif").innerHTML = c;
}
