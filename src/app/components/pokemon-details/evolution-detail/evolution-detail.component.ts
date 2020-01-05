import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evolution-detail',
  templateUrl: './evolution-detail.component.html',
  styleUrls: ['./evolution-detail.component.css']
})
export class EvolutionDetailComponent implements OnInit, OnChanges {
  

  public pokemon: any;
  public loading: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.loading = false;
    this.pokemonService.dataPokemonEvolutionDetails.subscribe((result: any) => {
      this.pokemon = this.transformDataEvolution({...result.chain});
      this.loading = true;
    });

  }

  ngOnChanges() {
    // this.loading = false;
    
  }  

  ngOnInit() {
    
  }

  public verMas(id: string) {
      this.router.navigate(['/pokemon', id]);
  }

  public transformDataEvolution(response: string) {

    const evolutionDetails: any = response;
    const evolutions: any[] = [];

    const numeroEvoluciones = evolutionDetails.evolves_to.length;

    let data = evolutionDetails;

    while (data) {
      if (numeroEvoluciones > 1) {
        // Primer Pokémon
        if (data.evolves_to.length !== 0) {
          evolutions.push(this.detailsPokemonEvolution(data));
        }
        // Resto de evoluciones especiales
        for (const evo of data.evolves_to) {
          evolutions.push(this.detailsPokemonEvolution(evo));
        }
      } else {
        // Evoluciones normales
        evolutions.push(this.detailsPokemonEvolution(data));
      }

      data = data.evolves_to[0];
    }
    return evolutions;
  }

  public detailsPokemonEvolution(data: any) {
    return {
      name: data.species.name,
      id: this.getIDfromURL(data.species.url),
      item: !data.evolution_details[0]? null : data.evolution_details[0].item,
      minLvl : !data.evolution_details[0] ? 1 : data.evolution_details[0].min_level,
      trigger: !data.evolution_details[0]? null : data.evolution_details[0].trigger
    }
  }
 
  private getIDfromURL(url: string): number {
    const cleanURL = url.slice(0, -1);
    return Number(cleanURL.substr(cleanURL.lastIndexOf('/') + 1));
  }


}
