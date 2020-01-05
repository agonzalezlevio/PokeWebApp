import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokeAPI: any;
  public pokeSpeciesAPI: any;
  public pokeGenerationAPI: any;
  public pokeEvolutionChainAPI: any;
  public pokeTypeRelationsAPI: any;
  public pokeAbilitiesAPI: any;


  public cachedPokemonList: any[] = [];

  public dataPokemonBasicsDetails = new Subject<any>();
  public dataPokemonEvolutionDetails = new Subject<any>();
  public dataPokemonSpecieDetails = new Subject<any>();
  public dataPokemonTypeRelationsDetails = new Subject<any>();
  public dataPokemonAbilitiesDetails = new Subject<any>();



  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    this.pokeGenerationAPI = environment.pokemonGeneration;
    this.pokeEvolutionChainAPI = environment.pokemonEvolutionChain;
    this.pokeTypeRelationsAPI = environment.pokemonTypeRelations;
    this.pokeAbilitiesAPI = environment.pokemonAbilities;
  }

  // Forma alternativa comunicación para sub componentes en cascada

  public fetchDataPokemonBasicsDetails(idPokemon: number) {
    this.getPokemonBasicDetails(idPokemon).subscribe((result: any) => {
      this.dataPokemonBasicsDetails.next(result);

      // Solicitud de detalles de la especie Pokémon
      const idSpecies = this.getIDfromURL(result.species.url);
      this.fetchDataPokemonSpecieDetails(idSpecies);

      // Solicitud de detalles del typo del Pokémon
      const types: any[] = result.types;
      this.fetchDataPokemonTypeDetails(types);

      // Solicitud de detalles de habilidades del Pokémon
      const abilities: any[] = result.abilities;
      this.fetchDataPokemonAbilitiesDetails(abilities);

    })
  }

  public fetchDataPokemonSpecieDetails(idPokemon: number) {
    this.getPokemonSpecieDetails(idPokemon).subscribe((result: any) => {
      this.dataPokemonSpecieDetails.next(result);

      const idEvolutionChain = this.getIDfromURL(result.evolution_chain.url);
      this.fetchDataPokemonEvolutionDetails(idEvolutionChain);

    })
  }

  public fetchDataPokemonEvolutionDetails(idEvolution: number) {
    this.getPokemonEvolutionDetails(idEvolution).subscribe((result: any) => {
      this.dataPokemonEvolutionDetails.next(result);
    })
  }

  public fetchDataPokemonTypeDetails(types: any[]) {
    this.getDetailsType(types).subscribe((result: any) => {
      this.dataPokemonTypeRelationsDetails.next(result);
    })
  }


  public fetchDataPokemonAbilitiesDetails(ability: any[]) {
    this.getAbilities(ability).subscribe((result: any) => {

      this.dataPokemonAbilitiesDetails.next(this.mergeAbilityDetailsById(ability, result));
    })
  }

  public mergeAbilityDetailsById(ability: any[], result: any[]) {
    return ability.map(itemAbility => (
      {
        ...result.find((itemResult) => (itemResult.id === this.getIDfromURL(itemAbility.ability.url)) && itemResult),
        ...itemAbility
      }
    ));
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


  public getDetailsType(types: any[]) {
    const typesResponse$: any[] = [];
    types.map((slot: any) => {
      const idType = this.getIDfromURL(slot.type.url);
      typesResponse$.push(this.getType(idType));
    });
    return forkJoin(typesResponse$);
  }

  public getType(id: number) {
    return this.http.get(`${this.pokeTypeRelationsAPI}/${id}`);
  }


  public getAbility(id: number) {
    return this.http.get(`${this.pokeAbilitiesAPI}/${id}`);
  }

  public getAbilities(abilities: any[]) {
    const abilities$: any[] = [];
    abilities.map((slot: any) => {
      const idAbility = this.getIDfromURL(slot.ability.url);
      abilities$.push(this.getAbility(idAbility));
    });
    return forkJoin(abilities$);
  }


  public getPokemonsBasicDetailsByGeneration(number: number) {
    return this.http.get(`${this.pokeGenerationAPI}/${number}`)
      .pipe(
        switchMap((resp: any) => {
          const pokemons$ = resp.pokemon_species.map(pokemon => {
            const id = this.getIDfromURL(pokemon.url);
            return this.getPokemonBasicDetails(id);
          });
          return forkJoin(pokemons$);
        }),
        map((result: any) => {
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
        return this.getPokemonBasicDetails(id);
      });
      return forkJoin(pokemons$).pipe(map((result: any) => {
        return result.sort(this.compareID);
      }));
    } else {
      // No encuentra resultados
      return of([]);
    }

  }

  public getPokemonBasicDetails(id: number) {
    return this.http.get(`${this.pokeAPI}/${id}`);
  }

  public getPokemonEvolutionDetails(id: number) {
    return this.http.get(`${this.pokeEvolutionChainAPI}/${id}`);
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
