import { Component } from '@angular/core';
import {Data, RouterLink} from "@angular/router";
import {HomeCardsComponent} from "../../pagesParts/home-cards/home-cards.component";
import Datas from "../../classes/datas";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    HomeCardsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  //obtention des datas et passage a l'enfant "home-cards"
  datas:Datas = new Datas();
  items:Observable<any[]> = this.datas.getAll();
}
