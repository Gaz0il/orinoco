import { furnitures } from "../Repository";

function listfurniture() {
  const getdata = new furnitures();
  getdata.getAllFurnitures();
}
