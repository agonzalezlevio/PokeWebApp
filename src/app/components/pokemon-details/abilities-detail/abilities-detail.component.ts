import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-abilities-detail',
  templateUrl: './abilities-detail.component.html',
  styleUrls: ['./abilities-detail.component.css']
})
export class AbilitiesDetailComponent implements OnInit {

  public abilities: any[];
  public loading: boolean;

  constructor(private pokemonService: PokemonService) {
    this.loading = false;
    this.pokemonService.dataPokemonAbilitiesDetails.subscribe((result: any) => {
     this.abilities= result;
     this.loading = true;
    })
   }

  ngOnInit() {
  }

}
