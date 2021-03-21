function dataConfirmation() {
  return JSON.parse(localStorage.getItem("confirmation"));
}
/*******Contruction de la confirmation ******/
function confirmationBuilder() {
  const data = dataConfirmation();

  document.getElementById("numCommande").innerHTML = data.orderId;
  document.getElementById("price").innerHTML = data.price + " €";
  document.getElementById("thx").innerHTML =
    "Nous vous confirmons que la commande a bien été prise en compte au nom de " +
    data.data.contact.firstName +
    " " +
    data.data.contact.lastName;
  clearall();
}
/*******clear storage basket et confirmation*********/
function clearall() {
  localStorage.removeItem("confirmation");
  localStorage.removeItem("basket");
}
confirmationBuilder();
