import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  public pokemonLoading: boolean;
  public pokemon: any;

  constructor(private ActivateRoute: ActivatedRoute, private pokemonService: PokemonService) {
    this.pokemonLoading = false;
    this.pokemonService.dataPokemonBasicsDetails.subscribe(result => {
      this.pokemon = result;
      this.pokemonLoading = true;
    })
  }

  ngOnChanges() {
   
  }  

  ngAfterViewInit(): void {
    this.ActivateRoute.paramMap.subscribe( (resp: any)  => {
      const pokemonID = resp.params.id;
      this.pokemonService.fetchDataPokemonBasicsDetails(pokemonID);
    });
  }


  ngOnInit() {
  }


}
