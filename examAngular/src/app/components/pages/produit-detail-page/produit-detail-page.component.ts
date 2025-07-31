import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-produit-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './produit-detail-page.component.html',
  styleUrl: './produit-detail-page.component.css'
})
export class ProduitDetailPageComponent implements OnInit{
  produitID:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
        //recuperation de l'id du produit
        this.route.params.subscribe((params:any) => {
          this.produitID = params['id'];
        })

    }

}

