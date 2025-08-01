import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DecimalPipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

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
  @Input() filter: string = "";

  datas: Array<any> = [];

  ngOnInit(): void {
    this.items.subscribe(item => {
      //transformation observable => Array
      for (let data of item) {
        console.log(data);
        this.datas.push(data);
      }
      //application de filter
      if (this.filter != "") {
        let filteredList = [];
        for (let data of this.datas) {

        }
      }

      //application de la limite
      if (this.limit > 0) {
        this.datas = this.datas.slice(0, this.limit)
      }
    })

  }
}
