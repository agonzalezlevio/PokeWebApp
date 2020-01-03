import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evolution-detail',
  templateUrl: './evolution-detail.component.html',
  styleUrls: ['./evolution-detail.component.css']
})
export class EvolutionDetailComponent implements OnInit {

  @Input() pokemonChainID: number;
  public pokemon: any;
  public loading: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) { 
    this.loading = false;

  }

  ngOnInit() {
    this.pokemonService.getPokemonEvolutionChain(this.pokemonChainID).subscribe((result: any) => {
      this.pokemon = result;
      this.loading = true;
    });
  }

  public verMas(id: string) {
    this.router.navigate(['/pokemon', id]);
  }

}
