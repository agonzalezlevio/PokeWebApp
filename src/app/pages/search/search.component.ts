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
  public filteredPokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {
    this.pokemonLoading = true;

   }

  ngOnInit() {
    this.pokemonService.getPokemons(807).subscribe();
  }


  public busqueda(termino: string) {
    this.pokemonLoading = false;

    this.pokemonService.searchPokemonList(termino).subscribe( result => {
      this.filteredPokemonList = result;
      this.pokemonLoading = true;
    });
  }




}
