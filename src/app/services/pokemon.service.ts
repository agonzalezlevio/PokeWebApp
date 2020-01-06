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
  public pokeMovesAPI: any;


  public cachedPokemonList: any[] = [];

  public dataPokemonBasicsDetails = new Subject<any>();
  public dataPokemonEvolutionDetails = new Subject<any>();
  public dataPokemonSpecieDetails = new Subject<any>();
  public dataPokemonTypeRelationsDetails = new Subject<any>();
  public dataPokemonAbilitiesDetails = new Subject<any>();
  public dataPokemonMovesDetails = new Subject<any>();



  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    this.pokeGenerationAPI = environment.pokemonGeneration;
    this.pokeEvolutionChainAPI = environment.pokemonEvolutionChain;
    this.pokeTypeRelationsAPI = environment.pokemonTypeRelations;
    this.pokeAbilitiesAPI = environment.pokemonAbilities;
    this.pokeMovesAPI = environment.pokemonMoves;
  }


  /**
     * Se obtiene e insertan los detalles básicos de un Pokémon
     * @param idPokemon ID de Pokémon de un pokémon
     */
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

      // Solicitud de detalles de movimientos del Pokémon
      /* const moves: any[] = result.moves;
      this.fetchDataMovesDetails(moves);
      */
    })
  }

  /**
     * Se obtiene e insertan la especie de un Pokémon
     * @param {number} idPokemon ID de la especie de un pokémon
     */
  public fetchDataPokemonSpecieDetails(idPokemon: number) {
    this.getPokemonSpecieDetails(idPokemon).subscribe((result: any) => {
      this.dataPokemonSpecieDetails.next(result);

      const idEvolutionChain = this.getIDfromURL(result.evolution_chain.url);

      this.fetchDataPokemonEvolutionDetails(idEvolutionChain);

    })
  }

  /**
     * Se obtiene e insertan la cadena de evolución de un Pokémon
     * @param {number} idEvolution ID de la cadena de evolución de un pokémon
     */
  public fetchDataPokemonEvolutionDetails(idEvolution: number) {
    this.getPokemonEvolutionDetails(idEvolution).subscribe((result: any) => {
      this.dataPokemonEvolutionDetails.next(result);
    })
  }

  /**
     * Se obtiene e insertan las tipos de un Pokémon
     * @param {any[]} types Arreglo con las lista de tipos
     */
  public fetchDataPokemonTypeDetails(types: any[]) {
    this.getDetailsType(types).subscribe((result: any) => {
      this.dataPokemonTypeRelationsDetails.next(result);
    })
  }

  /**
   * Se obtiene e insertan los movimientos de un Pokémon
   * @param {any[]} moves Arreglo con las lista de movimientos
   */
  public fetchDataMovesDetails(moves: any[]) {
    this.getMovesDetails(moves).subscribe((result: any) => {

      this.dataPokemonMovesDetails.next(this.mergeMovesDetailsById(moves, result));
    })
  }

  /**
   * Se obtiene una lista mezclada con los movimientos sin detallar y detallados 
   * @param {any[]}  moves Movimientos de un Pokémon sin detallar
   * @param {any[]} result Resultados de movimientos detallados
   */
  public mergeMovesDetailsById(moves: any[], result: any[]) {
    return moves.map(itemMoves => (
      {
        ...result.find((itemResult) => (itemResult.id === this.getIDfromURL(itemMoves.move.url)) && itemResult),
        ...itemMoves
      }
    ));
  }

  /**
   * Se obtiene e insertan las habilidades de un Pokémon
   * @param {any[]} ability Arreglo con las lista de habilidades
   */
  public fetchDataPokemonAbilitiesDetails(ability: any[]) {
    this.getAbilities(ability).subscribe((result: any) => {

      this.dataPokemonAbilitiesDetails.next(this.mergeAbilityDetailsById(ability, result));
    })
  }

  /**
    * Se obtiene una lista mezclada con las habilidades sin detallar y detallados 
    * @param {any[]}  ability Habilidades de un Pokémon sin detallar
    * @param {any[]} result Resultados de habilidades detallados
    */
  public mergeAbilityDetailsById(ability: any[], result: any[]) {
    return ability.map(itemAbility => (
      {
        ...result.find((itemResult) => (itemResult.id === this.getIDfromURL(itemAbility.ability.url)) && itemResult),
        ...itemAbility
      }
    ));
  }

  /**
  * Se obtiene una lista de detalles de movimientos según los movimientos que posea un Pokémon
  * @param {any[]} moves Arreglo de movimientos de un Pokémon
  */
  public getMovesDetails(moves: any[]) {
    const movesResponse$: any[] = [];
    moves.map((itemMove: any) => {
      const idType = this.getIDfromURL(itemMove.move.url);
      movesResponse$.push(this.getPokemonMovesDetails(idType));
    });
    return forkJoin(movesResponse$);
  }

  /**
   * Se obtiene la cantidad de generaciones presentes en la api, retorna la generación en número romano y estándar
   */
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

  /**
   * Se obtiene una lista detallada de Pokémon por generación
   * @param {number} idGeneration ID de la generación de Pokémon (1-7) 
   */
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


  /**
   * Se obtiene una lista de detalles de tipos según los tipos que posea un Pokémon
   * @param {any[]} types Arreglo de tipos de un Pokémon
   */
  public getDetailsType(types: any[]) {
    const typesResponse$: any[] = [];
    types.map((itemType: any) => {
      const idType = this.getIDfromURL(itemType.type.url);
      typesResponse$.push(this.getPokemonType(idType));
    });
    return forkJoin(typesResponse$);
  }

  /**
  * Se obtiene los detalles de un tipo de un Pokémon
  * @param {number} id ID de un tipo de un Pokémon 
  */
  public getPokemonType(id: number) {
    return this.http.get(`${this.pokeTypeRelationsAPI}/${id}`);
  }

  /**
   * Se obtiene los detalles de una habilidad de un Pokémon
   * @param {number} id ID de la habilidad Pokémon 
   */
  public getPokemonAbility(id: number) {
    return this.http.get(`${this.pokeAbilitiesAPI}/${id}`);
  }


  /**
   * Se obtiene una lista de detalles de habilidades según las habilidades de un Pokémon
   * @param {any[]} abilities Arreglo de habilidades de un Pokémon
   */
  public getAbilities(abilities: any[]) {
    const abilities$: any[] = [];
    abilities.map((itemAbility: any) => {
      const idAbility = this.getIDfromURL(itemAbility.ability.url);
      abilities$.push(this.getPokemonAbility(idAbility));
    });
    return forkJoin(abilities$);
  }

  /**
   * Se obtiene una lista de Pokémon y sus detalles básicos
   * @param {number} number  Números de Pokémon a obtener
   */
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

  /**
   * Compara dos términos y determina quien en mayor o menor
   * @param a Primer termino a comparar
   * @param b Segundo termino a comparar
   */
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

  /**
   * Se obtiene una lista de Pokémon según la cantidad establecida
   * @param {number} limit Cantidad de Pokémon a buscar
   */
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


  /**
   * Se obtienen una lista de Pokémon que coincidan con el termino de búsqueda
   * @param {string} termino Termino a buscar
   */
  public searchPokemonList(termino: string) {
    const searchTerm = termino.toLowerCase();
    // Se realiza la búsqueda por filtro en lista de Pokémon en cache
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

  /**
   * Se obtienen los detalles de una evolución
   * @param {number} id ID de la cadena de evolución de un Pokémon 
   */
  public getPokemonBasicDetails(id: number) {
    return this.http.get(`${this.pokeAPI}/${id}`);
  }

  /**
   * Se obtienen los detalles de un movimiento Pokémon
   * @param {number} id ID del movimiento de un Pokémon 
   */
  public getPokemonMovesDetails(id: number) {
    return this.http.get(`${this.pokeMovesAPI}/${id}`);
  }

  /**
   * Se obtienen los detalles de una cadena de evolución
   * @param {number} id ID de la cadena de evolución de un Pokémon 
   */
  public getPokemonEvolutionDetails(id: number) {
    return this.http.get(`${this.pokeEvolutionChainAPI}/${id}`);
  }

  /**
   * Se obtienen los detalles de una especie Pokémon
   * @param {number} id ID de la especie de un Pokémon 
   */
  public getPokemonSpecieDetails(id: number) {
    return this.http.get(`${this.pokeSpeciesAPI}/${id}`);
  }

  /**
   * Se obtiene la ID a partir de una URL
   * @param {string} url URL para limpiar y extraer la id
   */
  private getIDfromURL(url: string): number {
    // Se borra la última '/' de la url
    const cleanURL = url.slice(0, -1);
    // Se retorna un parse en la url limpia para obtener la id
    return Number(cleanURL.substr(cleanURL.lastIndexOf('/') + 1));
  }

}
