import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImagen'
})
export class PokemonImagenPipe implements PipeTransform {

  private URL_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private URL_IMAGE_HQ = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

  transform(id: number, hq: boolean): any {
      if (hq) {
        return this.URL_IMAGE_HQ + id.toString().padStart(3, '0')  + '.png';
      }
      return this.URL_IMAGE + id  + '.png';
  }

}
