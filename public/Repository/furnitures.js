class Furnitures {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/furniture/";
  }
  /** Get all
   * @returns list of products
   */
  async getAllFurnitures() {
    try {
      const res = await fetch(this.baseUrl);
      return await res.json();
    } catch (error) {
      return undefined;
    }
  }
  /** Get on specific id of product
   * @param id String of id Product
   * @returns one product
   */
  async getFunrituresById(id) {
    try {
      const res = await fetch(this.baseUrl + id);
      return await res.json();
    } catch (error) {
      return undefined;
    }
  }
}
