import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImagen'
})
export class PokemonImagenPipe implements PipeTransform {

  private URL_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  transform(id: number): any {
        return this.URL_IMAGE + id  + '.png';
  }
}
