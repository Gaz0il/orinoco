class Furnitures {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/furniture/";
  }

  async getAllFurnitures() {
    const res = await fetch(this.baseUrl);
    return await res.json();
  }
}
