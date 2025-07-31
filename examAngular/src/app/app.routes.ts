import { Routes } from '@angular/router';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {ProduitsPageComponent} from "./components/pages/produits-page/produits-page.component";
import {EntreprisePageComponent} from "./components/pages/entreprise-page/entreprise-page.component";
import {ProduitDetailPageComponent} from "./components/pages/produit-detail-page/produit-detail-page.component";
import {ContactPageComponent} from "./components/pages/contact-page/contact-page.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'produits', component: ProduitsPageComponent},
  { path: 'entreprise', component: EntreprisePageComponent},
  { path: 'produit/:id', component: ProduitDetailPageComponent},
  { path: 'contact', component: ContactPageComponent},
  { path: '**', redirectTo: ''}
];
