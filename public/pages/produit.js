const params = new URLSearchParams(window.location.search);
let meubleId = params.get("id");

async function getDetailById(id) {
  const getdata = new Furnitures();
  return await getdata.getFunrituresById(id);
}
getDetailById(meubleId);

/*
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
imageUrl: "http://localhost:3000/images/oak_1.jpg"
name: "Cross Table"
price: 59900
varnish: (3) ["Dark Oak", "Light Oak", "Mahogany"]
_id: "5be9cc611c9d440000c1421e"
*/
