export class furnitures {
  constructor(props) {
    super(props);
  }

  async getAllFurnitures() {
    return this._fetchEndPoint();
  }

  async getFurnitureById(idproduit) {
    return this._fetchEndPoint(`/?id=${idproduit}`);
  }

  async _fetchEndPoint(path) {
    const res = await fetch(`http://localhost:3000/api/furniture${path}`);
    return await res.json();
  }
}
