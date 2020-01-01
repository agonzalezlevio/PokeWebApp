import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {

  @Input() pokemon: any ;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }


  public verMas(id: string) {
    this.router.navigate(['/pokemon', id]);
  }

}
