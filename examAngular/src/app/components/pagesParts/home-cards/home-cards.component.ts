import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent implements OnInit{
  @Input() items!: Observable<any[]>;
  datas: Array<any> = [];
  ngOnInit(): void {
      this.items.subscribe(item => {
        this.datas.push(item);
        console.log(this.datas);
      })
  }
}
