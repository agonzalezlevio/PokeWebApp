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

  constructor(private pokemonService: PokemonService) { 
  }

  ngOnInit() {
    this.pokemonService.getGenerations().subscribe(result => {
      this.generationList = result;
      this.pokemonLoading = true;
    });
  }

  public onChange(value: number) {
    this.pokemonLoading = false;
    this.pokemonService.getPokemonsByGeneration(value).subscribe(result => {
      this.pokemonList = result;
      this.pokemonLoading = true;
    });
  }




}
