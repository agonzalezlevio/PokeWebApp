import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {

  @Input() pokemon: any ;


  constructor() { }

  ngOnInit() {
  }

  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }

}
