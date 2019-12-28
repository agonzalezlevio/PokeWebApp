import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemonList: any[] = [];
  public generationList: any[] = [];
  public pokemonLoading: boolean;
  public generationSelected: string = '';


  constructor(private pokemonService: PokemonService) {
    this.pokemonLoading = true;
  }

  ngOnInit() {
    this.pokemonService.getGenerations().subscribe(result => {
      this.generationList = result;
    });

  }

  public onChange(value: any) {
    this.pokemonLoading = false;

    this.pokemonService.getPokemonsSpeciesByGeneration(value.index).subscribe((result: any) => {
      this.generationSelected = value.name.toUpperCase();
      this.pokemonList = result;
      this.pokemonLoading = true;
    });
  }




}
