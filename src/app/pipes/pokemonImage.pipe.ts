import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImagen'
})
export class PokemonImagePipe implements PipeTransform {

  private URL_IMAGE_PIXEL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private URL_IMAGE = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
  private URL_IMAGE_FULL_HQ = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";

  private prefixCount: number = 3; // 000

  transform(id: number, number: number): any {

    switch (number) {
      case 1:
        return this.URL_IMAGE + id.toString().padStart(this.prefixCount, '0') + '.png';
      case 2:
        return this.URL_IMAGE_FULL_HQ + id.toString().padStart(this.prefixCount, '0') + '.png';
      default:
        return this.URL_IMAGE_PIXEL + id + '.png';

    }

  }

}
