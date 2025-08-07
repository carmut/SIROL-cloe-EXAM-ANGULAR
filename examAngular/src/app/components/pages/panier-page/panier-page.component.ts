import { Component, OnInit } from '@angular/core';
import Panier from '../../classes/panier';
import { CurrencyPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-panier-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    NgIf,
    NgForOf,
  ],
  templateUrl: './panier-page.component.html',
  styleUrl: './panier-page.component.css',
})
export class PanierPageComponent implements OnInit {
  panier: any[] = []; // Stocke les produits du panier
  total: number = 0; // Stocke le montant total

  constructor() {}

  ngOnInit(): void {
    this.loadPanier();
  }

  /**
   * Charge les produits depuis le localStorage et calcule le total
   */
  loadPanier(): void {
    this.panier = Panier.getCart(); // Récupère les produits du panier
    this.calculateTotal();
  }

  /**
   * Supprime un produit du panier
   * Diminue la quantité si > 1, sinon supprime le produit.
   * @param productId ID du produit à supprimer
   */
  removeFromPanier(productId: number): void {
    Panier.removeProductFromCart(productId);
    this.loadPanier(); // Recharge le panier après suppression
  }

  /**
   * Vide complètement le panier
   */
  clearPanier(): void {
    Panier.clearCart();
    this.loadPanier(); // Recharge le panier (sera vide)
  }

  /**
   * Calcule le total du panier en prenant en compte les quantités
   */
  calculateTotal(): void {
    this.total = this.panier.reduce((sum, product) => {
      const discountPrice = product.fullPrice - (product.fullPrice * (product.discountPercent || 0));
      return sum + discountPrice * product.quantity; // Multiplie par la quantité
    }, 0);
  }
}
