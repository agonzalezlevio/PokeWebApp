import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { merge } from 'rxjs/internal/observable/merge';
import { concat } from 'rxjs/internal/observable/concat';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokeAPI: any;
  public pokeSpeciesAPI: any;
  public pokeGenerationAPI: any;


  public cachedPokemonList: any[] = [];


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

  public getPokemonsSpeciesByGeneration(number: number) {
    return this.http.get(`${this.pokeGenerationAPI}/${number}`)
      .pipe(
        switchMap((resp: any) => {

          const pokemons$ = resp.pokemon_species.map(pokemon => {
            // Se borra la última '/' de la url y limpiar la url
            const cleanURL = pokemon.url.slice(0, -1);
            // Se realiza un parse en la url limpia para obtener la id
            const id = cleanURL.substr(cleanURL.lastIndexOf('/') + 1);
            // Se hace un join para cada observable para que los detalles y la especie del pokemon se mantengan juntos
            return forkJoin(this.getPokemonByName(id), this.getSpeciesByName(id));
          });

          return forkJoin(pokemons$);
        }),
        map((result: any) => {
          return this.joinDetailsAndSpecie(result).sort(this.compareID);
        })
      );

  }

  private joinDetailsAndSpecie(result: any) {
    // Nueva lista de pokémon
    const newList: any[] = [];

    for (const value of result) {

      const pokemon = {
        stats: value[0].stats,
        id: value[0].id,
        types: value[0].types,
        name: value[0].species.name,
        genera: value[1].genera,
        flavor_text_entries: value[1].flavor_text_entries
      };

      newList.push(pokemon);
    }

    return newList;
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
    if (this.cachedPokemonList.length > 0) {
      return of(this.cachedPokemonList);
    } else {
      return this.http.get(`${this.pokeAPI}?limit=${limit}`)
        .pipe(
          map((result: any) => {
            return result.results.map(pokemon => {
              // Se borra la última '/' de la url y limpiar la url
              const cleanURL = pokemon.url.slice(0, -1);
              // Se realiza un parse en la url limpia para obtener la id
              const id = cleanURL.substr(cleanURL.lastIndexOf('/') + 1);
              return {
                name: pokemon.name,
                id
              };
            });
          }),
          tap(cachedPokemon => this.cachedPokemonList = cachedPokemon)
        );
    }
  }

  public searchPokemonList(name: string) {
    const searchTerm = name.toLowerCase();

    const filteredPokemonList = this.cachedPokemonList.filter((pokemon: any) => {
      if (pokemon.name.indexOf(searchTerm) !== -1) {
        return pokemon;
      }
    });
    // Si encuentra resultados, se realiza la petición con los encontrados
    if (filteredPokemonList.length > 0) {
      const pokemons$ = filteredPokemonList.map(pokemon => {
        const id = pokemon.id;
        return forkJoin(this.getPokemonByName(id), this.getSpeciesByName(id));
      });
      return forkJoin(pokemons$).pipe(map((result: any) => {
        return this.joinDetailsAndSpecie(result).sort(this.compareID);
      }));
    } else {
      // No encuentra resultados
      return of([]);
    }



  }

  public getPokemonByName(name: string) {
    return this.http.get(`${this.pokeAPI}/${name}`);
  }


  public getSpeciesByName(name: string) {
    return this.http.get(`${this.pokeSpeciesAPI}/${name}`);
  }
}
