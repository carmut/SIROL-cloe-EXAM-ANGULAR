export default class Panier {
  private static storageKey = 'panier'; // Clé utilisée dans le localStorage

  /**
   * Ajoute un produit au panier sauvegardé dans le localStorage.
   * Si le produit existe déjà, augmente la quantité.
   * @param product Produit à ajouter au panier.
   */
  static addProductToCart(product: any): void {
    const panier = this.getCart();
    const existingProduct = panier.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Augmente la quantité
    } else {
      product.quantity = 1; // Ajoute une nouvelle propriété quantity
      panier.push(product);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(panier));
  }

  /**
   * Récupère tous les produits du panier à partir du localStorage.
   * @returns {Array<any>} Liste des produits avec leurs quantités.
   */
  static getCart(): Array<any> {
    const cartJSON = localStorage.getItem(this.storageKey);
    return cartJSON ? JSON.parse(cartJSON) : [];
  }

  /**
   * Vider le panier en supprimant toutes les données du localStorage.
   */
  static clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Supprime un produit spécifique du panier.
   * Si la quantité > 1, diminue la quantité. Sinon, supprime le produit.
   * @param productId ID du produit à retirer.
   */
  static removeProductFromCart(productId: number): void {
    let panier = this.getCart();
    const existingProduct = panier.find((p) => p.id === productId);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1; // Diminue la quantité
      } else {
        panier = panier.filter((p) => p.id !== productId); // Supprime si la quantité arrive à 0
      }
    }

    localStorage.setItem(this.storageKey, JSON.stringify(panier));
  }
}
