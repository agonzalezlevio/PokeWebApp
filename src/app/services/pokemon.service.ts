import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
// import { concat, mergeMap } from 'rxjs';


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

  public getPokemonsByGeneration(idGeneration: number) {
    return this.http.get(`${this.pokeGenerationAPI}/${idGeneration}`)
      .pipe(
        switchMap((resp: any) => {

          const pokemons$ = resp.pokemon_species.map(pokemon => {

            const id = this.getIDfromURL(pokemon.url);

            return this.getPokemonBasicDetails(id);
          });

          return forkJoin(pokemons$);
        }),
        map(result => {
          return result.sort(this.compareID);
        })
      );

  }

  public getPokemonAllDetails(idPokemon: number) {
    return this.getPokemonSpecieDetails(idPokemon).pipe(
      switchMap((result: any) => {

        const urlEvolutionChain = result.evolution_chain.url;
        const id = this.getIDfromURL(urlEvolutionChain);

        return forkJoin(this.getPokemonEvolutionChain(id), of(result), this.getPokemonBasicDetails(idPokemon));

      }), map(result => {
        return this.joinDetailsPokemon(result);
      }));
  }

  public getPokemonEvolutionChain(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  }

  private joinDetailsPokemon(result: any) {
    return {
      chain: result[0].chain,
      stats: result[2].stats,
      id: result[2].id,
      height: result[2].height,
      weight: result[2].weight,
      types: result[2].types,
      name: result[2].species.name,
      genera: result[1].genera,
      flavor_text_entries: result[1].flavor_text_entries
    };
  }

  public getPokemonsSpeciesByGeneration(number: number) {
    return this.http.get(`${this.pokeGenerationAPI}/${number}`)
      .pipe(
        switchMap((resp: any) => {

          const pokemons$ = resp.pokemon_species.map(pokemon => {
            const id = this.getIDfromURL(pokemon.url);
            return forkJoin(this.getPokemonBasicDetails(id), this.getPokemonSpecieDetails(id));
          });

          return forkJoin(pokemons$);
        }),
        map((result: any) => {
          return this.joinDetailsPokemons(result).sort(this.compareID);
        })
      );

  }


  private joinDetailsPokemons(result: any) {
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
              const id = this.getIDfromURL(pokemon.url);
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
        return forkJoin(this.getPokemonBasicDetails(id), this.getPokemonSpecieDetails(id));
      });
      return forkJoin(pokemons$).pipe(map((result: any) => {
        return this.joinDetailsPokemons(result).sort(this.compareID);
      }));
    } else {
      // No encuentra resultados
      return of([]);
    }

  }

  public getPokemonBasicDetails(id: number) {
    return this.http.get(`${this.pokeAPI}/${id}`);
  }


  public getPokemonSpecieDetails(id: number) {
    return this.http.get(`${this.pokeSpeciesAPI}/${id}`);
  }


  private getIDfromURL(url: string): number {
    // Se borra la última '/' de la url
    const cleanURL = url.slice(0, -1);
    // Se retorna un parse en la url limpia para obtener la id
    return Number(cleanURL.substr(cleanURL.lastIndexOf('/') + 1));
  }

}
