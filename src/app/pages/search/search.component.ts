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

    const terminoBusqueda = termino.trim();

    this.filteredPokemonList = [];
    this.pokemonLoading = false;
    this.empty = false;

    if (terminoBusqueda.length > 1) {
      this.pokemonService.searchPokemonList(terminoBusqueda).subscribe(result => {

        this.filteredPokemonList = result;
        this.pokemonLoading = true;

        if (this.filteredPokemonList.length === 0) {
          this.empty = true;
        }
      });
    } else {
      this.empty = true;
      this.pokemonLoading = true;
    }
  }




}
