import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public pokemonList: any[] = [];
  public pokemonLoading: boolean;
  public filteredPokemonList: any[] = [];
  public empty: boolean;

  constructor(private pokemonService: PokemonService) {
    this.pokemonLoading = true;
    this.empty = false;

  }

  ngOnInit() {
    this.pokemonService.getPokemons(807).subscribe();
  }


  public busqueda(termino: string) {
    this.pokemonLoading = false;

    this.pokemonService.searchPokemonList(termino).subscribe(result => {

      this.filteredPokemonList = result;
      this.pokemonLoading = true;

      if (this.filteredPokemonList.length === 0) {
        this.empty = true;
      }
    });
  }




}
