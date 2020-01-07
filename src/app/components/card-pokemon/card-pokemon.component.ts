import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {

  @Input() pokemon: any ;

  constructor(private router: Router) { }

  public verMas(id: string) {
    this.router.navigate(['/pokemon', id]);
  }

}
