import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Component({
  selector: 'app-types-pokemon',
  templateUrl: './types-pokemon.component.html',
  styleUrls: ['./types-pokemon.component.css']
})
export class TypesPokemonComponent implements OnInit {


  @Input() leyenda: any;
  @Input() types: any[];


  constructor() { }

  ngOnInit() {}


  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }

}
