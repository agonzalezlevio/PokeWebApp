import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  public pokemonLoading: boolean;
  public pokemon: any;

  constructor(private ActivateRoute: ActivatedRoute, private pokemonService: PokemonService) {
    this.pokemonLoading = true;
  }

  ngOnInit() {
    this.ActivateRoute.paramMap.subscribe( (resp: any)  => {

      const pokemonID = resp.params.id;

      this.pokemonService.getPokemonAllDetails(pokemonID).subscribe(result => {
        this.pokemon = result;
        this.pokemonLoading = false;
      });
    });
  }

  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }

  

}
