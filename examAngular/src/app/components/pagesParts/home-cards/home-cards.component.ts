import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DecimalPipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import Panier from '../../classes/panier'; // Assurez-vous d'importer la classe Panier

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PercentPipe,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent implements OnInit {
  @Input() items!: Observable<any[]>;
  @Input() limit: number = 0;
  @Input() filters: Array<any> = [];

  datas: Array<any> = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    //activation du loader
    this.isLoading = true;

    this.items.subscribe(item => {
      // Transformation Observable => Array
      this.datas = [...item];

      // Application des filtres si présents
      if (this.filters.length !== 0) {
        const { namefilter, minpricefilter, maxpricefilter, categoriesfilter } = this.filters[0];

        this.datas = this.datas.filter(data => {
          // Vérifier le nom ou le mot-clé
          const matchesName = namefilter
            ? data.title.toLowerCase().includes(namefilter.toLowerCase())
            : true;

          // Vérifier le prix minimum
          const matchesPriceMin = minpricefilter
            ? data.fullPrice >= parseFloat(minpricefilter)
            : true;

          // Vérifier le prix maximum
          const matchesPriceMax = maxpricefilter
            ? data.fullPrice <= parseFloat(maxpricefilter)
            : true;

          // Vérifier toutes les catégories
          const matchesCategory = categoriesfilter && categoriesfilter.length
            ? categoriesfilter.every((category: any) =>
              data.features.some((feature: { title: any; }) => feature.title === category)
            )
            : true;

          // Retourner true uniquement si toutes les conditions sont satisfaites
          return matchesName && matchesPriceMin && matchesPriceMax && matchesCategory;
        });
      }

      // Application de la limite si nécessaire
      if (this.limit > 0) {
        this.datas = this.datas.slice(0, this.limit);
      }

      //desactivation du loader une fois la page ready
      this.isLoading = false;

    });
  }

  // Fonction pour ajouter au panier
  addToCart(product: any): void {
    Panier.addProductToCart(product);
  }
}
