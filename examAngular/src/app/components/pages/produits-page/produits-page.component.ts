import { Component } from '@angular/core';
import Datas from "../../classes/datas";
import {Observable} from "rxjs";
import {HomeCardsComponent} from "../../pagesParts/home-cards/home-cards.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-produits-page',
  standalone: true,
  imports: [
    HomeCardsComponent,
    NgForOf
  ],
  templateUrl: './produits-page.component.html',
  styleUrl: './produits-page.component.css'
})
export class ProduitsPageComponent {
  datas:Datas = new Datas();
  items:Observable<any[]> = this.datas.getAll();
  categories: string[] = [
    'Silencieux',
    'Télécommande',
    'LED',
    'Mobile',
    'Économique',
    'Oscillant',
    'Minuterie',
    'Haute Performance',
    'Wifi',
    'Portable',
    'USB',
    'Écologique',
    'Humidificateur',
    'Industriel',
    'Puissant',
    'Robuste',
    'Mural',
    '3 vitesses'
  ];

  selectedCategories: string[] = [];

  onCategorySelect(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      // Ajouter la catégorie sélectionnée
      this.selectedCategories.push(value);
    } else {
      // Supprimer la catégorie si elle est désélectionnée
      this.selectedCategories = this.selectedCategories.filter(
        (category) => category !== value
      );
    }

    // Afficher les catégories sélectionnées (à utiliser selon vos besoins)
    console.log('Catégories sélectionnées :', this.selectedCategories);
  }

}
