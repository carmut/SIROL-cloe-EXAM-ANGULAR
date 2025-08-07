import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Datas from '../../classes/datas';
import Panier from '../../classes/panier'; // Importez la classe Panier
import { Observable } from 'rxjs';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-produit-detail-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './produit-detail-page.component.html',
  styleUrl: './produit-detail-page.component.css'
})
export class ProduitDetailPageComponent implements OnInit {
  produitID: number | null = null;
  item: any = {}; // Stocke l'objet produit
  datas: Datas = new Datas();
  isLoading: boolean = true; // Indique si les données sont en cours de chargement

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.produitID = +params['id'];
      if (this.produitID) {
        const produit$: Observable<any> | null = this.datas.getOne(this.produitID);
        produit$?.subscribe({
          next: (data: any) => {
            if (data) {
              this.item = data;
            } else {
              console.error(`Aucun produit trouvé avec l'ID ${this.produitID}`);
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du produit :', err);
            this.isLoading = false;
          }
        });
      } else {
        console.error('ID du produit invalide');
        this.isLoading = false;
      }
    });
  }

  // Fonction ajoutant le produit au panier via la classe Panier
  addToCart(product: any): void {
    Panier.addProductToCart(product);
  }
}
