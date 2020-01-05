import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-basics-detail',
  templateUrl: './basics-detail.component.html',
  styleUrls: ['./basics-detail.component.css']
})
export class BasicsDetailComponent implements OnInit {

  @Input() pokemon: any;

  constructor() { 
    
  }

  ngOnInit() {

  }

  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }

}
