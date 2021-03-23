/** collect data from localstorage
 * @return Json of the localstorage "confirmation"
 */
function dataConfirmation() {
  return JSON.parse(localStorage.getItem("confirmation"));
}
/** Build content in confirmation.html  */
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
/** Clear both localstorage "confirmation" and "basket" */
function clearall() {
  localStorage.removeItem("confirmation");
  localStorage.removeItem("basket");
}
confirmationBuilder();
