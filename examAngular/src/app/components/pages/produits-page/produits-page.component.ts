import {Component, OnInit} from '@angular/core';
import Datas from "../../classes/datas";
import {Observable} from "rxjs";
import {HomeCardsComponent} from "../../pagesParts/home-cards/home-cards.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-produits-page',
  standalone: true,
  imports: [
    HomeCardsComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './produits-page.component.html',
  styleUrl: './produits-page.component.css'
})
export class ProduitsPageComponent implements OnInit {
  datas: Datas = new Datas();
  items: Observable<any[]> = this.datas.getAll();
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
  searchName: string = '';
  searchPriceMin: string = '';
  searchPriceMax: string = '';
  filters:Array<any> = [];

  constructor(private route: ActivatedRoute) {}

  //recuperation des filtre si presents
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['searchName']) {
        this.searchName = params['searchName'];
      }

      if (params['searchPriceMin']) {
        this.searchPriceMin = params['searchPriceMin'];
      }

      if (params['searchPriceMax']) {
        this.searchPriceMax = params['searchPriceMax'];
      }

      if (params['categories']) {
        this.selectedCategories = params['categories'].split(',');
      }

      this.filters.push({
        "namefilter": this.searchName,
        "maxpricefilter": this.searchPriceMax,
        "minpricefilter": this.searchPriceMin,
        "categoriesfilter": this.selectedCategories,
      })

      console.log('Filtres récupérés depuis l\'URL :', {
        searchName: this.searchName,
        searchPriceMin: this.searchPriceMin,
        searchPriceMax: this.searchPriceMax,
        selectedCategories: this.selectedCategories
      });
    });
  }

  //gestion checkbox filter
  onCategorySelect(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.selectedCategories.push(value);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (category) => category !== value
      );
    }
  }

  onFormSubmit(formValues: any): void {
    const params: { [key: string]: string | string[] } = {};

    Object.keys(formValues).forEach(key => {
      const value = formValues[key];
      if (value && value.trim !== '') {
        params[key] = value;
      }
    });

    if (this.selectedCategories.length) {
      params['categories'] = this.selectedCategories;
    }

    const url = new URL(window.location.href);
    Object.keys(params).forEach(key => {
      const paramValue = params[key];
      if (Array.isArray(paramValue)) {
        url.searchParams.set(key, paramValue.join(','));
      } else {
        url.searchParams.set(key, paramValue);
      }
    });

    window.location.href = url.toString();
  }


  onReset(): void {
    window.location.href = window.location.origin + window.location.pathname;
  }

}
