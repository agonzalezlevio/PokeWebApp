import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public pokemonList: any [] = [];
  public pokemonLoading: boolean;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonLoading = false;
    this.pokemonService.getPokemons(807).subscribe(result => {
      this.pokemonList = result;
      this.pokemonLoading = true;
    });
  }

}
