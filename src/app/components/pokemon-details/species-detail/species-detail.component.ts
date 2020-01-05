import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.css']
})
export class SpeciesDetailComponent implements OnInit {

  public pokemon: any;
  public loading: boolean;
  constructor(private pokemonService: PokemonService) { 
    this.loading = false;

    this.pokemonService.dataPokemonSpecieDetails.subscribe(result => {
      this.pokemon = result;
      this.loading = true;
    });
  }

  ngOnInit() {
  }

}
