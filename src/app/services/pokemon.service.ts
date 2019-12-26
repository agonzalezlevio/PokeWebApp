import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokeAPI: any;
  public pokeSpeciesAPI: any;
  public pokeGenerationAPI: any;


  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    this.pokeGenerationAPI = environment.pokemonGeneration;
  }

  public getGenerations() {
    return this.http.get(`${this.pokeGenerationAPI}`).pipe(map((resp: any) => {

      const results = resp.results.map((generation, index) => {
        return {
          name: generation.name.split('-')[1],
          index: index + 1
        };
      });

      return results;
    }));
  }

  public getPokemonsByGeneration(number: number) {
    return this.http.get(`${this.pokeGenerationAPI}/${number}`)
      .pipe(
        switchMap((resp: any) => {

          const pokemons$ = resp.pokemon_species.map(pokemon => {
            // Se borra la última '/' de la url y limpiar la url
            const cleanURL = pokemon.url.slice(0, -1);
            // Se realiza un parse en la url limpia para obtener la id
            const id = cleanURL.substr(cleanURL.lastIndexOf('/') + 1);

            return this.getPokemonByName(id);
          });

          return forkJoin(pokemons$);
        }),
        map(result => {
          return result.sort(this.compareID);
        })
      );

  }

  private compareID(a: any, b: any) {
    const idA = a.id;
    const idB = b.id;
    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  }

  public getPokemons(limit: number) {
    return this.http.get(`${this.pokeAPI}?limit=${limit}`)
      .pipe(
        switchMap((res: any) => {

          const pokemons$ = res.results.map(pokemon => {
            return this.getPokemonByName(pokemon.name);
          });

          return forkJoin(pokemons$);
        })
      );
  }

  public getPokemonByName(name: string) {
    return this.http.get(`${this.pokeAPI}/${name}`);
  }


  public getSpeciesByName(name: string) {
    return this.http.get(`${this.pokeSpeciesAPI}/${name}`);
  }
}
